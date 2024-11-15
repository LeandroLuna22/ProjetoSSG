document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('perfil-form');
  const perfilList = document.getElementById('perfil-list');
  const alunoId = new URLSearchParams(window.location.search).get('id'); // Captura o aluno_id

  console.log("Aluno ID obtido da URL:", alunoId); // Log do aluno_id

  // Função para listar dados do perfil do aluno
  function fetchPerfilData() {
    fetch(`perfil/${alunoId}`)
      .then(response => response.json())
      .then(data => {
        console.log("Dados do perfil recebidos:", data); // Log dos dados recebidos
        perfilList.innerHTML = ''; // Limpa a lista atual
        if (data.success) {
          data.data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `Motora: ${item.motora}, Atenção: ${item.atencao}, Fala: ${item.fala}, Interação: ${item.interacao}`;
            perfilList.appendChild(li);
          });
        }
      })
      .catch(error => console.error('Erro ao buscar dados do perfil:', error));
  }

  // Função para adicionar novos dados ao perfil do aluno
  form.addEventListener('submit', event => {
    event.preventDefault();
    const motora = parseFloat(document.getElementById('motora').value);
    const atencao = parseFloat(document.getElementById('atencao').value);
    const fala = parseFloat(document.getElementById('fala').value);
    const interacao = parseFloat(document.getElementById('interacao').value);

    console.log("Dados enviados para inserção:", { aluno_id: alunoId, motora, atencao, fala, interacao });

    fetch('/perfil/adicionar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ aluno_id: alunoId, motora, atencao, fala, interacao })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Resposta do servidor após inserção:", data); // Log da resposta do servidor
      if (data.success) {
        fetchPerfilData(); // Atualiza a lista após adicionar
        form.reset(); // Limpa o formulário
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Erro ao adicionar dados ao perfil:', error));
  });

  fetchPerfilData(); // Carrega a lista ao abrir a página
});
