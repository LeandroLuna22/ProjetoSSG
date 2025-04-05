const express = require('express');
const router = express.Router();
const db = require('../database/db');
const verificarToken = require('../middleware/auth');

// Rota para criar notas de serviço
router.post('/', verificarToken, (req, res) => {
  const { id, usuario_id, titulo, descricao} = req.body;

  db.query(
    'INSERT INTO notaservico (titulo, descricao) VALUES (?, ?)',
    [titulo, descricao],
    (err, results) => {
      if (err) {
        console.error('Erro ao criar nota:', err);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
      }
      res.json({ mensagem: 'Nota criada com sucesso' });
    }
  );
});

// Rota para obter notas de serviço
router.get('/', verificarToken, (req, res) => {
  db.query('SELECT * FROM notaservico', (err, results) => {
    if (err) {
      console.error('Erro ao obter notas:', err);
      return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
    res.json(results);
  });
});

module.exports = router;