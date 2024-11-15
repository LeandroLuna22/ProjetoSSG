CREATE DATABASE site_escola;

USE site_escola;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(100),
  senha VARCHAR(255)
);

CREATE TABLE perfil_aluno (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aluno_id INT,
  motora decimal(10, 2),
  atencao decimal(10, 2),
  fala decimal(10, 2),
  interacao decimal(10, 2),
  FOREIGN KEY (aluno_id) REFERENCES ide_b1(id) ON DELETE CASCADE
);

CREATE TABLE ide_b1 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  meses INT,
  professora varchar(100)
  );
