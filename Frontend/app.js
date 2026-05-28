const API = 'http://localhost:4000/api';

//estado global de la aplicación
const state = {
  user: null,       // { id_usuario, nombre, apellido, rol, jwt }
  products: [],     // todos los productos del servidor
  categories: [],   // todas las categorias
  favorites: [],    // IDs de productos en favoritos
  cart: [],         // elementos del carrito
  currentProduct: null,
  selectedInventario: null,
  filteredCat: null,
};

//funciones utilitarias 
const $ = id => document.getElementById(id);
const fmt = n => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = $(`page-${name}`);
  if (pg) pg.classList.add('active');
  window.scrollTo(0, 0);
}

function showError(id, msg) {
  const el = $(id);
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
}
function hideError(id) {
  const el = $(id);
  if (el) el.classList.add('hidden');
}
function showSuccess(id, msg) {
  const el = $(id);
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 3500);
}

function authHeaders() {
  return { 'Content-Type': 'application/json', 'Authorization': state.user?.jwt || '' };
}

function isLoggedIn() { return !!state.user; }
function isAdmin() { return state.user?.rol === 'admin'; }

//cambio de tema oscuro/claro
function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}
function updateThemeIcon(theme) {
  $('theme-toggle').textContent = theme === 'light' ? '☽' : '☀';
}

//actualiza el header dependiendo del estado de login y rol del usuario
function updateHeader() {
  const loginBtn = $('login-btn');
  const userBtn = $('user-btn');
  const favBtn = $('fav-btn');

  // eliminar el boton admin si existiese (en caso de logout o cambio de rol)
  const existingAdmin = $('admin-btn');
  if (existingAdmin) existingAdmin.remove();

  if (isLoggedIn()) {
    loginBtn.textContent = 'Cerrar sesión';
    loginBtn.onclick = logout;
    favBtn.classList.remove('hidden');

    if (isAdmin()) {
      const adminBtn = document.createElement('button');
      adminBtn.id = 'admin-btn';
      adminBtn.textContent = 'Gestionar productos';
      adminBtn.onclick = () => { loadAdminCats(); showPage('admin'); };
      document.querySelector('.header-right').insertBefore(adminBtn, loginBtn);
    }
  } else {
    loginBtn.textContent = 'Iniciar sesión';
    loginBtn.onclick = () => showPage('login');
    favBtn.classList.add('hidden');
  }
}

//autentificacion y registro de usuarios, con sesiones y almacenamiento local
async function doLogin() {
  hideError('login-error');
  const email = $('login-email').value.trim();
  const password = $('login-password').value;
  if (!email || !password) return showError('login-error', 'Completá todos los campos.');
  try {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.codigo !== 200) return showError('login-error', data.mensaje || 'Usuario o contraseña incorrecta.');
    const u = data.payload[0];
    state.user = { ...u, jwt: data.jwt };
    localStorage.setItem('session', JSON.stringify(state.user));
    updateHeader();
    await loadFavorites();
    await loadCart();
    showPage('home');
  } catch (e) {
    showError('login-error', 'Error de conexión con el servidor.');
  }
}

async function doRegister() {
  hideError('reg-error');
  const body = {
    nombre: $('reg-nombre').value.trim(),
    apellido: $('reg-apellido').value.trim(),
    direccion: $('reg-direccion').value.trim(),
    telefono: $('reg-telefono').value.trim(),
    email: $('reg-email').value.trim(),
    password: $('reg-password').value,
    rol: 'usuario'
  };
  for (const [k, v] of Object.entries(body)) {
    if (!v && k !== 'direccion' && k !== 'telefono') return showError('reg-error', 'Completá todos los campos obligatorios.');
  }
  try {
    const res = await fetch(`${API}/registrarUsuario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (data.codigo !== 200) return showError('reg-error', data.mensaje || 'Error al registrar.');
    alert('¡Cuenta creada! Ya podés iniciar sesión.');
    showPage('login');
  } catch (e) {
    showError('reg-error', 'Error de conexión con el servidor.');
  }
}

function logout() {
  state.user = null;
  state.favorites = [];
  state.cart = [];
  localStorage.removeItem('session');
  updateHeader();
  updateCartBadge();
  showPage('home');
}

function restoreSession() {
  try {
    const saved = localStorage.getItem('session');
    if (saved) state.user = JSON.parse(saved);
  } catch (_) {}
}

//funciones para cargar y mostrar productos, con filtros por categoria, genero y color  
async function loadProducts() {
  try {
    const res = await fetch(`${API}/obtenerProductos`);
    const data = await res.json();
    if (data.codigo === 200) {
      state.products = data.payload;
      buildCategoryDropdown();
      buildFilterCatSelect();
    }
  } catch (e) {
    console.error('Error cargando productos', e);
  }
}

function renderProducts(products) {
  const grid = $('products-grid');
  if (!products || products.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-icon">👚</div><p>No se encontraron productos.</p>
    </div>`;
    return;
  }
  grid.innerHTML = products.map(p => productCard(p)).join('');
  // Attach events
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.classList.contains('fav-card-btn')) return;
      openProduct(card.dataset.id);
    });
  });
  grid.querySelectorAll('.fav-card-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleFavorite(parseInt(btn.dataset.id), btn);
    });
  });
}

function productCard(p) {
  const isFav = state.favorites.includes(p.idProducto);
  const img = p.ulrImagen || p.urlImagen || 'https://placehold.co/400x533/f5f0eb/8b5e3c?text=Sin+imagen';
  return `<div class="product-card" data-id="${p.idProducto}">
    <img src="${img}" alt="${p.producto}" onerror="this.src='https://placehold.co/400x533/f5f0eb/8b5e3c?text=Sin+imagen'"/>
    ${isLoggedIn() ? `<button class="fav-card-btn ${isFav ? 'active' : ''}" data-id="${p.idProducto}" title="Favoritos">${isFav ? '♥' : '♡'}</button>` : ''}
    <div class="product-card-body">
      <div class="cat-tag">${p.categoria || ''}</div>
      <h3>${p.producto}</h3>
      <div class="price">${fmt(p.precio)}</div>
    </div>
  </div>`;
}

async function openProduct(id) {
  try {
    const res = await fetch(`${API}/obtenerDatosProducto/${id}`);
    const data = await res.json();
    if (data.codigo !== 200 || !data.payload.length) return;
    state.currentProduct = { id, data: data.payload };
    state.selectedInventario = null;
    renderProductDetail(data.payload);
    showPage('product');
  } catch (e) {
    console.error('Error cargando producto', e);
  }
}

function renderProductDetail(items) {
  const p = items[0];
  const img = p.ulrImagen || 'https://placehold.co/400x533/f5f0eb/8b5e3c?text=Sin+imagen';

  //agrupar por talle y color
  const byTalle = {};
  const byColor = {};
  items.forEach(i => {
    if (!byTalle[i.talle]) byTalle[i.talle] = [];
    byTalle[i.talle].push(i);
    if (!byColor[i.color]) byColor[i.color] = [];
    byColor[i.color].push(i);
  });

  const talleChips = Object.entries(byTalle).map(([t, arr]) => {
    const totalStock = arr.reduce((s, i) => s + i.stock, 0);
    return `<button class="variant-chip ${totalStock === 0 ? 'no-stock' : ''}" data-talle="${t}">${t}</button>`;
  }).join('');

  const colorChips = [...new Set(items.map(i => i.color))].map(c =>
    `<button class="variant-chip" data-color="${c}">${c}</button>`
  ).join('');

  const detail = $('product-detail');
  detail.innerHTML = `
    <div class="product-detail-wrap">
      <div class="product-detail-img">
        <img src="${img}" alt="${p.producto}" onerror="this.src='https://placehold.co/400x533/f5f0eb/8b5e3c?text=Sin+imagen'"/>
      </div>
      <div class="product-detail-info">
        <div class="detail-cat">${p.categoria} · ${p.genero}</div>
        <h2>${p.producto}</h2>
        <div class="detail-desc">${p.descripcion}</div>
        <div class="detail-price">${fmt(p.precio)}</div>

        <div class="variants-section">
          <h4>Talle</h4>
          <div class="variants-grid" id="talle-options">${talleChips}</div>
        </div>

        <div class="variants-section">
          <h4>Color</h4>
          <div class="variants-grid" id="color-options">${colorChips}</div>
        </div>

        <div class="cuotas-section">
          <h4>Cuotas</h4>
          <div class="cuotas-grid">
            ${[1,3,6,9,12].map(n => `<button class="cuota-btn ${n===1?'selected':''}" data-cuotas="${n}">${n}x</button>`).join('')}
          </div>
          <div class="cuotas-info" id="cuotas-info">
            <strong>${fmt(p.precio)}</strong> por cuota
          </div>
        </div>

        <div id="detail-stock-info" class="detail-stock">Seleccioná talle y color</div>

        <button class="btn-primary" id="add-to-cart-btn" disabled>
          ${isLoggedIn() ? 'Agregar al carrito' : 'Iniciá sesión para comprar'}
        </button>
      </div>
    </div>`;

  //logica de cuotas
  detail.querySelectorAll('.cuota-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      detail.querySelectorAll('.cuota-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const n = parseInt(btn.dataset.cuotas);
      const cuotaPrice = p.precio / n;
      $('cuotas-info').innerHTML = `<strong>${fmt(cuotaPrice)}</strong> × ${n} cuota${n > 1 ? 's' : ''}`;
    });
  });

  //seleccion de talle y color, actualizando stock y permitiendo agregar al carrito solo si hay stock disponible
  let selectedTalle = null, selectedColor = null;

  function updateSelection() {
    if (!selectedTalle || !selectedColor) {
      $('detail-stock-info').textContent = 'Seleccioná talle y color';
      $('add-to-cart-btn').disabled = true;
      state.selectedInventario = null;
      return;
    }
    const inv = items.find(i => i.talle === selectedTalle && i.color === selectedColor);
    if (!inv) {
      $('detail-stock-info').textContent = 'Combinación no disponible';
      $('add-to-cart-btn').disabled = true;
      state.selectedInventario = null;
      return;
    }
    const stockEl = $('detail-stock-info');
    if (inv.stock === 0) {
      stockEl.textContent = 'Sin stock disponible';
      stockEl.className = 'detail-stock no-stock';
      $('add-to-cart-btn').disabled = true;
      state.selectedInventario = null;
    } else {
      stockEl.textContent = `Stock disponible: ${inv.stock} unidades`;
      stockEl.className = 'detail-stock';
      $('add-to-cart-btn').disabled = !isLoggedIn();
      state.selectedInventario = inv.idInventario;
    }
  }

  detail.querySelectorAll('[data-talle]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('no-stock')) return;
      detail.querySelectorAll('[data-talle]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTalle = btn.dataset.talle;
      updateSelection();
    });
  });
  detail.querySelectorAll('[data-color]').forEach(btn => {
    btn.addEventListener('click', () => {
      detail.querySelectorAll('[data-color]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedColor = btn.dataset.color;
      updateSelection();
    });
  });

  $('add-to-cart-btn').addEventListener('click', () => {
    if (!isLoggedIn()) return showPage('login');
    addToCart();
  });
}

//categorias
function buildCategoryDropdown() {
  const cats = [...new Set(state.products.map(p => ({ id: p.idCategoria, name: p.categoria })))
    .reduce((m, c) => { m.set(c.id, c); return m; }, new Map()).values()];
  state.categories = cats;

  const menu = $('cat-menu');
  menu.innerHTML = `<a href="#" class="dropdown-item" data-cat="all">Todos los productos</a>`;
  cats.forEach(c => {
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'dropdown-item';
    a.dataset.cat = c.id;
    a.textContent = c.name;
    a.onclick = (e) => {
      e.preventDefault();
      menu.classList.remove('open');
      filterByCategory(c.id);
    };
    menu.appendChild(a);
  });
}

function buildFilterCatSelect() {
  const sel = $('filter-cat');
  sel.innerHTML = '<option value="">Todas</option>';
  state.categories.forEach(c => {
    sel.innerHTML += `<option value="${c.id}">${c.name}</option>`;
  });
}

function filterByCategory(catId) {
  showPage('home');
  if (catId === 'all') {
    renderProducts(state.products);
    return;
  }
  const filtered = state.products.filter(p => p.idCategoria == catId);
  renderProducts(filtered);
}

//filtros
function applyFilters() {
  const genero = $('filter-genero').value.toLowerCase();
  const cat = $('filter-cat').value;
  const color = $('filter-color').value.toLowerCase().trim();

  let result = [...state.products];
  if (genero) result = result.filter(p => p.genero?.toLowerCase() === genero);
  if (cat) result = result.filter(p => p.idCategoria == cat);
  // Color requires product detail — filter client side from what we have
  // We'll do a best-effort filter; actual color is in inventory
  if (color) result = result.filter(p => p.producto?.toLowerCase().includes(color));

  renderProducts(result);
  showPage('home');
}

function clearFilters() {
  $('filter-genero').value = '';
  $('filter-cat').value = '';
  $('filter-color').value = '';
  renderProducts(state.products);
}

//busqueda sencilla 
function doSearch() {
  const q = $('search-input').value.trim().toLowerCase();
  if (!q) { renderProducts(state.products); showPage('home'); return; }
  const filtered = state.products.filter(p =>
    p.producto?.toLowerCase().includes(q) || p.descripcion?.toLowerCase().includes(q)
  );
  renderProducts(filtered);
  showPage('home');
}
//seccion favoritos
async function loadFavorites() {
  if (!isLoggedIn()) return;
  try {
    const res = await fetch(`${API}/obtenerFavoritos/${state.user.id_usuario}`, {
      headers: authHeaders()
    });
    const data = await res.json();
    if (data.codigo === 200) {
      state.favorites = data.payload.map(f => f.idProducto);
    }
  } catch (e) { console.error('Error cargando favoritos', e); }
}

async function toggleFavorite(productId, btn) {
  if (!isLoggedIn()) return showPage('login');
  const isFav = state.favorites.includes(productId);
  try {
    if (isFav) {
      await fetch(`${API}/eliminarFavorito`, {
        method: 'DELETE',
        headers: authHeaders(),
        body: JSON.stringify({ id_usuario: state.user.id_usuario, id_producto: productId })
      });
      state.favorites = state.favorites.filter(id => id !== productId);
      btn.textContent = '♡';
      btn.classList.remove('active');
    } else {
      await fetch(`${API}/agregarFavorito`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ id_usuario: state.user.id_usuario, id_producto: productId })
      });
      state.favorites.push(productId);
      btn.textContent = '♥';
      btn.classList.add('active');
    }
  } catch (e) { console.error('Error toggling favorite', e); }
}

function renderFavoritesPage() {
  if (!isLoggedIn()) { showPage('login'); return; }
  const grid = $('favorites-grid');
  const favProducts = state.products.filter(p => state.favorites.includes(p.idProducto));
  if (!favProducts.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-icon">♡</div><p>No tenés productos en favoritos.</p>
    </div>`;
  } else {
    grid.innerHTML = favProducts.map(p => {
      const img = p.ulrImagen || 'https://placehold.co/400x533/f5f0eb/8b5e3c?text=Sin+imagen';
      return `<div class="fav-item" data-id="${p.idProducto}">
        <button class="fav-remove" data-id="${p.idProducto}" title="Eliminar de favoritos">✕</button>
        <img src="${img}" alt="${p.producto}" onerror="this.src='https://placehold.co/400x533/f5f0eb/8b5e3c?text=Sin+imagen'"/>
        <div class="fav-item-body">
          <h4>${p.producto}</h4>
          <div class="fav-price">${fmt(p.precio)}</div>
        </div>
      </div>`;
    }).join('');

    grid.querySelectorAll('.fav-item').forEach(item => {
      item.addEventListener('click', e => {
        if (e.target.classList.contains('fav-remove')) return;
        openProduct(item.dataset.id);
      });
    });
    grid.querySelectorAll('.fav-remove').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        await fetch(`${API}/eliminarFavorito`, {
          method: 'DELETE',
          headers: authHeaders(),
          body: JSON.stringify({ id_usuario: state.user.id_usuario, id_producto: id })
        });
        state.favorites = state.favorites.filter(f => f !== id);
        renderFavoritesPage();
      });
    });
  }
  showPage('favorites');
}
