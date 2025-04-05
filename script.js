// ... (código anterior)

function criarNota() {
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const token = localStorage.getItem('token'); // Obtém o token do localStorage

function listarNotas() {
  const token = localStorage.getItem('token');

  fetch('http://localhost:3000/notas', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Exibir as notas na página (tabela, lista, etc.)
      console.log(data);
    });
}