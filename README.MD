# Trocso

<div align="center">

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-8B5CF6?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square)
![NestJS](https://img.shields.io/badge/NestJS-Backend-E0234E?style=flat-square\&logo=nestjs)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-316192?style=flat-square\&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square\&logo=prisma)
</div>

---

# 1. Introdução

## 1.1 Objetivo

O Trocso é uma plataforma web voltada para a troca de produtos entre usuários.

O sistema permite que usuários publiquem anúncios, recebam propostas de troca e gerenciem negociações através de uma interface moderna e intuitiva.

---

# 2. Problema

Muitos usuários possuem objetos sem utilização que ainda possuem valor para outras pessoas.
Atualmente, a maioria das plataformas é voltada para compra e venda, tornando o processo de troca menos eficiente.
O Trocso busca solucionar esse problema através de um marketplace focado exclusivamente em ofertas e trocas.

---

# 3. Escopo do Sistema

O sistema contempla:

* Cadastro de usuários
* Login
* Completar perfil
* Cadastro de anúncios
* Busca de produtos
* Sistema de propostas
* Notificações
* Gerenciamento de anúncios
* Perfil de usuário

---

# 4. Arquitetura

## Frontend

Responsável por:

* Interface do usuário
* Consumo da API
* Gerenciamento de sessão
* Navegação

Tecnologias:

* HTML5
* CSS3
* JavaScript
* Bootstrap
* Axios

---

## Backend

Responsável por:

* Regras de negócio
* Autenticação
* Persistência de dados
* Upload de imagens
* Notificações

Tecnologias:

* Node.js
* NestJS
* Prisma ORM

---

## Banco de Dados

Tecnologia:

* PostgreSQL

ORM:

* Prisma

---

## Armazenamento

Tecnologia:

* Supabase Storage

Responsável por:

* Imagens dos anúncios
* Imagens de perfil

---

# 5. Módulos do Sistema

## 5.1 Autenticação

### Funcionalidades

* Cadastro
* Login
* Logout
* Refresh Token
* Proteção de rotas

### Entidades

User

---

## 5.2 Perfil

### Funcionalidades

* Completar perfil
* Alterar dados
* Definir categorias favoritas

### Campos

| Campo              | Tipo   |
| ------------------ | ------ |
| username           | string |
| city               | string |
| state              | string |
| favoriteCategories | array  |

---

## 5.3 Produtos

### Funcionalidades

* Criar produto
* Editar produto
* Excluir produto
* Renovar produto

### Campos

| Campo        | Tipo    |
| ------------ | ------- |
| id           | UUID    |
| name         | string  |
| description  | string  |
| categoryId   | UUID    |
| advertiserId | UUID    |
| address      | string  |
| latitude     | decimal |
| longitude    | decimal |

---

## 5.4 Explorar Produtos

Permite:

* Pesquisa por nome
* Pesquisa por categoria
* Visualização dos anúncios

---

## 5.5 Propostas

### Fluxo

1. Usuário visualiza anúncio
2. Usuário envia proposta
3. Anunciante recebe notificação
4. Anunciante aceita ou recusa

### Estados

* PENDING
* ACCEPTED
* REJECTED

---

## 5.6 Favoritos

Permite:

* Adicionar favoritos
* Remover favoritos
* Listar favoritos

---

## 5.7 Notificações

### Eventos

* Nova proposta
* Proposta aceita
* Proposta recusada
* Atualizações do sistema

### Estrutura

```ts
Notification {
  id: string
  title: string
  message: string
  read: boolean
  userId: string
  productId: string
}
```

---

# 6. Fluxos de Usuário

## Fluxo de Cadastro

```text
Cadastro
    ↓
Login
    ↓
Completar Perfil
    ↓
Explorar Produtos
```

---

## Fluxo de Anúncio

```text
Criar Anúncio
    ↓
Publicar
    ↓
Receber Propostas
    ↓
Aceitar ou Recusar
```

---

## Fluxo de Troca

```text
Usuário A publica anúncio
           ↓
Usuário B envia proposta
           ↓
Usuário A analisa
           ↓
Aceita ou Recusa
```

---

# 7. Estrutura de Banco de Dados

## Entidades Principais

* User
* Product
* Category
* Favorite
* Bid
* Notification

Relacionamentos:

```text
User
 ├── Products
 ├── Favorites
 ├── Notifications
 └── Bids

Product
 ├── Category
 ├── Advertiser
 ├── Notifications
 └── Bids
```

---

# 8. Interface do Usuário

## Páginas

### Landing Page

Objetivo:

Apresentação da plataforma.

---

### Explore

Objetivo:

Listagem de produtos.

---

### Produto

Objetivo:

Exibir detalhes do anúncio.

---

### Meus Anúncios

Objetivo:

Gerenciamento de anúncios.

---

### Notificações

Objetivo:

Central de notificações.

---

### Perfil

Objetivo:

Gerenciamento do usuário.

---

# 9. Requisitos Não Funcionais

* Interface responsiva
* Tempo de resposta inferior a 2 segundos
* Compatibilidade com dispositivos móveis
* Segurança baseada em JWT
* Upload seguro de imagens

---

# 10. Roadmap

## Fase Atual

* Sistema de anúncios
* Sistema de propostas
* Sistema de notificações

## Próximas Funcionalidades

* Chat em tempo real
* Sistema de avaliações
* Dashboard administrativo
* Aplicativo mobile

---

# 11. Autor

&copy; Túlio Diego Ferreira
Projeto e portfólio de desenvolvimento Full Stack.
