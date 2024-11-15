document.addEventListener('DOMContentLoaded', () => {
  // Para o campo de senha principal
  const btnSenha = document.querySelector('#toggle-senha');
  const inputSenha = document.querySelector('#password');

  btnSenha.addEventListener('click', () => {
    const isPassword = inputSenha.getAttribute('type') === 'password';
    inputSenha.setAttribute('type', isPassword ? 'text' : 'password');
    btnSenha.classList.toggle('fa-eye', isPassword);
    btnSenha.classList.toggle('fa-eye-slash', !isPassword);
  });

  // Para o campo de confirmar senha
  const btnConfirmSenha = document.querySelector('#toggle-confirmSenha');
  const inputConfirmSenha = document.querySelector('#confirmSenha');

  btnConfirmSenha.addEventListener('click', () => {
    const isPassword = inputConfirmSenha.getAttribute('type') === 'password';
    inputConfirmSenha.setAttribute('type', isPassword ? 'text' : 'password');
    btnConfirmSenha.classList.toggle('fa-eye', isPassword);
    btnConfirmSenha.classList.toggle('fa-eye-slash', !isPassword);
  });
});

// Submissão do formulário de cadastro
document.getElementById('form-cadastro').addEventListener('submit', async function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmSenha = document.getElementById('confirmSenha').value;

  // Valida se as senhas coincidem
  if (password !== confirmSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  try {
    const response = await fetch('/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ username, password })
    });

    const result = await response.json();

    if (result.success) {
      alert('Usuário cadastrado com sucesso!');
      window.location.href = '/login.html'; // Redireciona para a página de login
    } else {
      alert(result.message); // Exibe a mensagem de erro (ex: usuário já existe)
    }
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    alert('Erro ao cadastrar o usuário.');
  }
});

