document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-form');
    const studentList = document.getElementById('student-list');
  
// Função para exibir a lista de alunos com botões "Abrir" e "Remover"
function fetchStudents() {
  fetch('/bercario1/listar')
    .then(response => response.json())
    .then(data => {
      studentList.innerHTML = ''; // Limpa a lista atual
      if (data.success) {
        data.data.forEach(student => {
          const li = document.createElement('li');
          li.textContent = `Nome: ${student.nome}, Meses: ${student.meses}, Professora: ${student.professora}`;

          // Botão para abrir o perfil do aluno
          const openButton = document.createElement('button');
          openButton.textContent = 'Abrir';
          openButton.onclick = () => window.location.href = `/bercario1/perfil.html?id=${student.id}`;
          li.appendChild(openButton);

          // Botão para remover o aluno
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Remover';
          deleteButton.onclick = () => removeStudent(student.id);
          li.appendChild(deleteButton);

          studentList.appendChild(li);
        });
      }
    })
    .catch(error => console.error('Erro ao buscar dados:', error));
}

    
    // Função para remover um aluno da lista e do banco de dados
    function removeStudent(id) {
      fetch(`/bercario1/remover/${id}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          fetchStudents(); // Atualiza a lista após remover
        } else {
          alert('Erro ao remover aluno.');
        }
      })
      .catch(error => console.error('Erro ao remover aluno:', error));
    }
    
  
    // Função para adicionar novo aluno
    form.addEventListener('submit', event => {
      event.preventDefault();
      
      const nome = document.getElementById('nome').value;
      const meses = document.getElementById('meses').value;
      const professora = document.getElementById('professora').value;
      
      fetch('/bercario1/adicionar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, meses, professora })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          fetchStudents(); // Atualiza a lista após adicionar
          form.reset(); // Limpa o formulário
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Erro ao adicionar aluno:', error));
    });
  
    fetchStudents(); // Carrega a lista ao abrir a página
});
