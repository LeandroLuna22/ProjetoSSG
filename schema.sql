CREATE DATABASE condominio_os;

USE condominio_os;

CREATE TABLE Usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  identificador VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  tipo VARCHAR(20) NOT NULL
);

CREATE TABLE NotaServico (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  titulo VARCHAR(255),
  descricao TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20),
  FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE OrdemServico (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nota_servico_id INT,
  fornecedor_id INT,
  titulo VARCHAR(255),
  descricao TEXT,
  status VARCHAR(20),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_conclusao TIMESTAMP,
  FOREIGN KEY (nota_servico_id) REFERENCES NotaServico(id),
  FOREIGN KEY (fornecedor_id) REFERENCES Fornecedor(id)
);

CREATE TABLE Fornecedor (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  contato VARCHAR(255)
);

CREATE TABLE Comentario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ordem_servico_id INT,
  usuario_id INT,
  texto TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ordem_servico_id) REFERENCES OrdemServico(id),
  FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

-- Insira dados de exemplo para usuários
INSERT INTO Usuario (identificador, senha, tipo) VALUES
('A01', 'senha123', 'usuario'),
('sindico', 'senha456', 'administrador');