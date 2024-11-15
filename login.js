document.addEventListener('DOMContentLoaded', () => {
  // Botão de mostrar/ocultar senha
  const btnSenha = document.getElementById('toggle-senha');
  const inputSenha = document.getElementById('password');

  btnSenha.addEventListener('click', () => {
    const type = inputSenha.getAttribute('type') === 'password' ? 'text' : 'password';
    inputSenha.setAttribute('type', type);
    btnSenha.classList.toggle('fa-eye-slash');
  });

  // Lidar com o evento de envio do formulário
  document.querySelector('#form-login').addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    const usuario = document.querySelector('#username').value;
    const senha = document.querySelector('#password').value;

    // Enviar dados para o servidor
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: usuario, password: senha })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Salva o nome do usuário no localStorage
        localStorage.setItem('username', usuario);

        // Redireciona para home.html se o login for bem-sucedido
        window.location.href = 'home.html';
      } else {
        alert(data.message); // Exibe mensagem de erro
      }
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  });
});

