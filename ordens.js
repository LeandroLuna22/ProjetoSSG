const express = require('express');
const router = express.Router();
const db = require('../database/db');
const verificarToken = require('../middleware/auth');

// Rota para criar ordens de serviço
router.post('/', verificarToken, (req, res) => {
  const { nota_id, responsavel, descricao, data_criacao, status } = req.body;

  db.query(
    'INSERT INTO ordemservico (nota_servico_id, responsavel, descricao, data_criacao, status) VALUES (?, ?, ?, NOW(), ?)',
    [nota_id, responsavel, descricao, status],
    (err, results) => {
      if (err) {
        console.error('Erro ao criar ordem:', err);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
      }
      res.json({ mensagem: 'Ordem criada com sucesso' });
    }
  );
});

// Rota para obter ordens de serviço
router.get('/', verificarToken, (req, res) => {
  db.query(
    'SELECT ordemservico.*, notaservico.titulo FROM ordemservico JOIN notaservico ON ordemservico.nota_servico_id = notaservico.id',
    (err, results) => {
      if (err) {
        console.error('Erro ao obter ordens:', err);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
      }
      res.json(results);
  });
});

module.exports = router;