// autenticacion y registro de usuarios
// helpers disponibles solo en paginas standalone (register.html)
function showError(id, msg) { const el=$(id); if(!el) return; el.textContent=msg; el.classList.remove('hidden'); }
function hideError(id)       { const el=$(id); if(el) el.classList.add('hidden'); }
function isLoggedIn()        { return !!getSession(); }
function authHeaders()       { const u=getSession(); return {'Content-Type':'application/json','Authorization':u?.jwt||''}; }
function initTheme()         { const s=localStorage.getItem('theme')||'light'; document.documentElement.setAttribute('data-theme',s); const b=$('theme-toggle'); if(b) b.textContent=s==='light'?'☽':'☀'; }
function toggleTheme()       { const c=document.documentElement.getAttribute('data-theme'); const n=c==='light'?'dark':'light'; document.documentElement.setAttribute('data-theme',n); localStorage.setItem('theme',n); const b=$('theme-toggle'); if(b) b.textContent=n==='light'?'☽':'☀'; }

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
    closeLoginModal();
    updateHeader();
    await loadFavorites();
    await loadCart();
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
    window.location.href = 'index.html';
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
