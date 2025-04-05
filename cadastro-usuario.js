function cadastrarUsuario() {
  const identificador = document.getElementById('identificador').value;
  const senha = document.getElementById('senha').value;
  const tipo = document.getElementById('tipo').value;
  const token = localStorage.getItem('token');

  fetch('http://localhost:3000/usuarios/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ identificador, senha, tipo }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.mensagem);
    })
    .catch((error) => {
      console.error('Erro na requisição:', error);
      alert('Erro ao cadastrar usuário');
    });
}