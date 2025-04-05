const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const bcrypt = require('bcrypt');

const Usuario = sequelize.define('Usuario', {
  identificador: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    defaultValue: false,
  },
});

Usuario.beforeCreate(async (usuario) => {
  const hashedPassword = await bcrypt.hash(usuario.senha, 10);
  usuario.senha = hashedPassword;
});

module.exports = Usuario;