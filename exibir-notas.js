window.onload = function () {
  exibirNotas();
};

function exibirNotas() {
  const token = localStorage.getItem('token');

  fetch('http://localhost:3000/notas', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }
      return response.json();
    })
    .then((data) => {
      const notasList = document.getElementById('notas-list');
      notasList.innerHTML = '';

      data.forEach((nota) => {
        const notaDiv = document.createElement('div');
        notaDiv.classList.add('nota-item');

        // Título clicável
        const titulo = document.createElement('h3');
        titulo.textContent = nota.titulo;
        titulo.style.cursor = 'pointer';

        // Container para os detalhes
        const detalhesDiv = document.createElement('div');
        detalhesDiv.classList.add('detalhes-nota');
        detalhesDiv.style.display = 'none';

        const id = document.createElement('p');
        id.textContent = `ID: ${nota.id}`;

        const descricao = document.createElement('p');
        descricao.textContent = nota.descricao;

        const dataCriacao = document.createElement('p');
        dataCriacao.textContent = `Criado em: ${nota.data_criacao}`;

        detalhesDiv.appendChild(id);
        detalhesDiv.appendChild(descricao);
        detalhesDiv.appendChild(dataCriacao);

        // Adiciona o evento de clique
        titulo.addEventListener('click', () => {
          const visivel = detalhesDiv.style.display === 'block';
          detalhesDiv.style.display = visivel ? 'none' : 'block';
        });

        notaDiv.appendChild(titulo);
        notaDiv.appendChild(detalhesDiv);
        notasList.appendChild(notaDiv);
      });
    })
    .catch((error) => {
      console.error('Erro na requisição:', error);
      alert('Erro ao exibir notas de serviço: ' + error.message);
    });
}
