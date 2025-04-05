function exibirNomeUsuario() {
  const nome = localStorage.getItem('nome');
  document.getElementById('nome-usuario').textContent = `Bem-vindo, ${nome}!`;
}

function exibirMenu() {
  const tipo = localStorage.getItem('tipo');
  if (tipo && tipo.toLowerCase().includes('administrador')) {
    document.getElementById('menu-admin').style.display = 'block';
  }
}

function deslogar() {
  localStorage.removeItem('token');
  localStorage.removeItem('nome');
  localStorage.removeItem('tipo');
  window.location.href = 'index.html';
}

window.onload = function() {
  exibirNomeUsuario();
  exibirMenu();
};