# Library Management System

## Conteúdo

1. [Stack Tecnológica](#1-stack-tecnológica)
2. [Como Correr](#2-como-correr)
3. [Conexão à Base de Dados](#3-conexão-à-base-de-dados)

---

## 1. Stack tecnológica

### 1.1 Descrição da Stack

A tabela seguite mostra as tecnologias utilizadas no sistema

| Componente   | Tecnologia                                | Versão  | Propóstio                        |
|--------------|-------------------------------------------|---------|----------------------------------|
| Runtime      | [Node.js](https://nodejs.org/en)          | v26.1.0 | Linguagem principal (JavaScript) | 
| Framework    | [Express](https://expressjs.com/)         | v5.2.1  | Framework web back-end           | 
| Token        | [JWT](https://www.jwt.io/)                | v9.0.3  | Geração e validação de JWT       | 
| Persistência | [PostgreSQL](https://www.postgresql.org/) | v18.4   | Base de dados relacional         | 

---

## 2. Como correr

### 2.1 Development environment

Requer Node.js (npm).

```bash
cp .env.example .env
npm install
npm run dev
```

* Aplicação disponível em: `http://localhost:3000`

### 2.2 Seed (dados de exemplo)

Depois de configurar a base de dados e correr as migrações, executa o seed:

```bash
npx prisma db seed
```

---

## 3. Conexão à Base de Dados

### 3.1 Instalar e inicializar o PostgreSQL

```bash
# Instalar
sudo pacman -S postgresql
```

```bash
# Inicializar o cluster (só se faz uma vez, como utilizador postgres)
sudo -iu postgres initdb -D /var/lib/postgres/data --locale=C.UTF-8 --encoding=UTF8 --data-checksums
```

```bash
# Arrancar e ativar no boot
sudo systemctl enable --now postgresql
```

Verifica que está a correr:

```bash
systemctl status postgresql
```

---

### 3.2 Criar o utilizador e a database

Entra no psql como utilizador `postgres`:

```bash
sudo -iu postgres psql
```

E dentro do `psql`:

```bash
CREATE USER library_user CREATEDB WITH ENCRYPTED PASSWORD 'dev';
CREATE DATABASE library OWNER library_user;
```

---

### 3.3 Correr a migração

No terminal, dentro da pasta `backend`:

```bash
npx prisma migrate dev --name init
```

Se correr bem, vai mostrar algo como:

> Your database is now in sync with your schema.