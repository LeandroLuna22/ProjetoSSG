function login() {
  const identificador = document.getElementById('identificador').value;
  const senha = document.getElementById('senha').value;

  fetch('http://localhost:3000/usuarios/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identificador, senha }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('nome', data.nome);
        localStorage.setItem('tipo', data.tipo);
        alert('Login realizado com sucesso!');
        window.location.href = 'principal.html';
      } else {
        alert(data.mensagem);
      }
    })
    .catch((error) => {
      console.error('Erro na requisição:', error);
      alert('Erro na requisição de login');
    });
}