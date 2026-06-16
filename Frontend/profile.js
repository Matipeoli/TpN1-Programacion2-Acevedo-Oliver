// perfil de usuario - mis datos
// helpers disponibles solo en profile.html
function showError(id, msg) { const el=$(id); if(!el) return; el.textContent=msg; el.classList.remove('hidden'); }
function hideError(id)       { const el=$(id); if(el) el.classList.add('hidden'); }
function showSuccess(id,msg) { const el=$(id); if(!el) return; el.textContent=msg; el.classList.remove('hidden'); setTimeout(()=>el.classList.add('hidden'),3500); }
function authHeaders()       { const u=getSession(); return {'Content-Type':'application/json','Authorization':u?.jwt||''}; }

async function loadProfile() {
  const user = getSession();
  if (!user) { window.location.href = 'index.html'; return; }
  try {
    const res = await fetch(`${API}/obtenerDatosUsuario/${user.id_usuario}`, {
      headers: authHeaders()
    });
    const data = await res.json();
    if (data.codigo === 200) {
      const u = data.payload[0];
      $('p-nombre').value = u.nombre || '';
      $('p-apellido').value = u.apellido || '';
      $('p-direccion').value = u.direccion || '';
      $('p-telefono').value = u.telefono || '';
      $('p-email').value = u.email || '';
      $('p-password').value = '';
    } else {
      showError('profile-error', data.mensaje || 'No se pudieron cargar los datos del perfil.');
    }
  } catch (e) {
    showError('profile-error', 'Error de conexiÃ³n al cargar el perfil.');
  }
}

async function updateProfile() {
  const user = getSession();
  if (!user) { window.location.href = 'index.html'; return; }
  hideError('profile-error');
  const body = {
    nombre: $('p-nombre').value.trim(),
    apellido: $('p-apellido').value.trim(),
    direccion: $('p-direccion').value.trim(),
    telefono: $('p-telefono').value.trim(),
    email: $('p-email').value.trim(),
    password: $('p-password').value || user.password || '',
    rol: user.rol
  };
  try {
    const res = await fetch(`${API}/modificarUsuario/${user.id_usuario}`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (data.codigo === 200) showSuccess('profile-success', 'Datos actualizados correctamente.');
    else showError('profile-error', data.mensaje || 'Error al actualizar.');
  } catch (e) { showError('profile-error', 'Error de conexión.'); }
}
