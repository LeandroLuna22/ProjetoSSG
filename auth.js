const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  jwt.verify(token, 'seu_segredo', (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }
    req.usuario = decoded;
    next();
  });
}

module.exports = verificarToken;