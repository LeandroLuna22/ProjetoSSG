const express = require('express');
const router = express.Router();
const db = require('../database/db');
const jwt = require('jsonwebtoken');
const verificarToken = require('../middleware/auth');

// Rota de Login
router.post('/login', (req, res) => {
  const { identificador, senha } = req.body;

  db.query(
    'SELECT * FROM Usuario WHERE identificador = ? AND senha = ?',
    [identificador, senha],
    (err, results) => {
      if (err) {
        console.error('Erro na consulta ao banco de dados:', err);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
      }

      if (results.length > 0) {
        const usuario = results[0];
        const token = jwt.sign(
          { id: usuario.id, tipo: usuario.tipo },
          'seu_segredo',
          { expiresIn: '1h' }
        );
        res.json({ token, nome: usuario.identificador, tipo: usuario.tipo });
      } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
      }
    }
  );
});

// Rota de Cadastro de Usuários
router.post('/cadastrar', verificarToken, (req, res) => {
  const { identificador, senha, tipo } = req.body;
  const usuarioLogado = req.usuario;

  if (usuarioLogado.tipo !== 'administrador') {
    return res.status(403).json({ mensagem: 'Acesso negado' });
  }

  // Validação de dados (exemplo básico)
  if (!identificador || !senha || !tipo) {
    return res.status(400).json({ mensagem: 'Dados inválidos' });
  }

  db.query(
    'INSERT INTO Usuario (identificador, senha, tipo) VALUES (?, ?, ?)',
    [identificador, senha, tipo],
    (err, results) => {
      if (err) {
        console.error('Erro ao cadastrar usuário:', err);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
      }
      res.json({ mensagem: 'Usuário cadastrado com sucesso' });
    }
  );
});

module.exports = router;