create table accounts(
  id VARCHAR(250) PRIMARY KEY,
  code VARCHAR(250) NOT NULL UNIQUE,
  money VARCHAR(200) NOT NULL DEFAULT 0,
  credit VARCHAR(200) NOT NULL DEFAULT 0,
  debt VARCHAR(200) DEFAULT NULL,
  debtdate VARCHAR(250) DEFAULT NULL, 
  extrato TEXT ARRAY NOT NULL DEFAULT '{}',
  total VARCHAR(200) NOT NULL DEFAULT 0
);

create table creditapplications(
  id VARCHAR(250) PRIMARY KEY,
  birthday VARCHAR(250) NOT NULL,
  city VARCHAR(250) NOT NULL,
  cpf VARCHAR(250) NOT NULL UNIQUE,
  email VARCHAR(250) NOT NULL UNIQUE,
  gender VARCHAR(250) NOT NULL,
  idaccount VARCHAR(250) NOT NULL UNIQUE,
  name VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL,
  phone VARCHAR(250) NOT NULL UNIQUE,
  rg VARCHAR(250) NOT NULL UNIQUE,
  state VARCHAR(250) NOT NULL,
  value VARCHAR(200) NOT NULL,
  FOREIGN KEY(idaccount) REFERENCES accounts(id)
);

create table users(
  id VARCHAR(250) PRIMARY KEY,
  birthday VARCHAR(250) NOT NULL,
  city VARCHAR(250) NOT NULL,
  cpf VARCHAR(250) NOT NULL UNIQUE,
  email VARCHAR(250) NOT NULL UNIQUE,
  gender VARCHAR(250) NOT NULL,
  idaccount VARCHAR(250) NOT NULL UNIQUE,
  name VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL,
  phone VARCHAR(250) NOT NULL UNIQUE,
  rg VARCHAR(250) NOT NULL UNIQUE,
  state VARCHAR(250) NOT NULL,
  FOREIGN KEY(idaccount) REFERENCES accounts(id)
);

create table usersadm(
  id VARCHAR(250) PRIMARY KEY,
  birthday VARCHAR(250) NOT NULL,
  city VARCHAR(250) NOT NULL,
  cpf VARCHAR(250) NOT NULL UNIQUE,
  email VARCHAR(250) NOT NULL UNIQUE,
  gender VARCHAR(250) NOT NULL,
  name VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL,
  phone VARCHAR(250) NOT NULL UNIQUE,
  rg VARCHAR(250) NOT NULL UNIQUE,
  state VARCHAR(250) NOT NULL,
  mainadmin BOOL NOT NULL
);

create table userswaiting(
  id VARCHAR(250) PRIMARY KEY,
  birthday VARCHAR(250) NOT NULL,
  city VARCHAR(250) NOT NULL,
  cpf VARCHAR(250) NOT NULL UNIQUE,
  email VARCHAR(250) NOT NULL UNIQUE,
  gender VARCHAR(250) NOT NULL,
  name VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL,
  phone VARCHAR(250) NOT NULL UNIQUE,
  rg VARCHAR(250) NOT NULL UNIQUE,
  state VARCHAR(250) NOT NULL
);

create table usersbanned(
  id VARCHAR(250) PRIMARY KEY,
  birthday VARCHAR(250) NOT NULL,
  city VARCHAR(250) NOT NULL,
  cpf VARCHAR(250) NOT NULL UNIQUE,
  email VARCHAR(250) NOT NULL UNIQUE,
  gender VARCHAR(250) NOT NULL,
  idaccount VARCHAR(250) NOT NULL UNIQUE,
  name VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL,
  phone VARCHAR(250) NOT NULL UNIQUE,
  rg VARCHAR(250) NOT NULL UNIQUE,
  state VARCHAR(250) NOT NULL,
  FOREIGN KEY(idaccount) REFERENCES accounts(id)
);

CREATE TABLE states (
    CodeUf INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Uf CHAR(2)  NOT NULL
);

CREATE TABLE cities (
  Code INT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Uf CHAR(2) NOT NULL
);
