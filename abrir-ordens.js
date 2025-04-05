function abrirOrdem() {
  const nota_id = document.getElementById('nota_id').value;
  const responsavel = document.getElementById('responsavel').value;
  const descricao = document.getElementById('descricao').value;
  const status = document.getElementById('status').value;
  const token = localStorage.getItem('token');

  fetch('http://localhost:3000/ordens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nota_id, responsavel, descricao, status }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }
      return response.json();
    })
    .then((data) => {
      alert(data.mensagem);
      // Limpar o formulário ou redirecionar o usuário
    })
    .catch((error) => {
      console.error('Erro na requisição:', error);
      alert('Erro ao abrir ordem de serviço: ' + error.message);
    });
}