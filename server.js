const express = require('express');
const bodyParser = require('body-parser');
const usuariosRoutes = require('./routes/usuarios');
const notasRoutes = require('./routes/notas');
const ordensRoutes = require('./routes/ordens');
const path = require('path'); // Adicione esta linha

const app = express();
app.use(bodyParser.json());

app.use('/usuarios', usuariosRoutes);
app.use('/notas', notasRoutes);
app.use('/ordens', ordensRoutes);

app.use(express.static(path.join(__dirname, '../frontend'))); // Adicione esta linha

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html')); // Adicione esta linha
});



app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});