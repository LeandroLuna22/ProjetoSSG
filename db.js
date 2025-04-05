const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Substitua pelo seu usuário do MySQL
  password: 'MySQL@1593', // Substitua pela sua senha do MySQL
  database: 'condominio_os', // Substitua pelo nome do seu banco de dados
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

module.exports = connection;