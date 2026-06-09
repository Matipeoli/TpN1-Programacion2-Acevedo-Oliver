// utils.js — constantes y helpers compartidos entre todas las páginas

const API = 'http://localhost:4000/api';

const $ = id => document.getElementById(id);
const fmt = n => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

// lee la sesion desde localStorage (funciona en cualquier pagina)
function getSession() {
  try { return JSON.parse(localStorage.getItem('session')); } catch (_) { return null; }
}
