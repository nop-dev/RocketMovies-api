# RocketMovies-api 🎬

Projeto desenvolvido com o objetivo de dominar melhor Node.js e com certeza esse projeto me ajudou a alcançar isso.

## 💻 Projeto

Este repositório contém uma API completa construída com Node.js, Express e Knex.js. A seguir, você encontrará informações sobre como a API foi desenvolvida e como você pode executá-la e usá-la.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- SQLite
- Knex.js
- hash (bcrypt)
- Insomnia
- Beekeeper Studio
  
## 🔖 Objetivo

O objetivo deste projeto foi criar uma API de Notas para filmes, que cadastra, atualiza, deleta os usuários, notas que os mesmos cadastram e suas tags. Esse projeto utiliza um banco de dados SQLite formulado usando Knex.js para armazenar dados. Foram criadas rotas para executar operações CRUD (Criar, Ler, Atualizar e Excluir) no banco de dados. A aplicação também utiliza criptografia de senhas, validação de e-mail e aplicação de cascata para garantir que uma tag será excluída caso o usuário opte por excluir a nota.

Pretendo mais adiante ainda modificar o projeto. Suas sugestões são muito bem vindas!

## 💾 Iniciar Projeto

Siga estas etapas para configurar e usar a API em sua máquina local:

```git
# Clone este repositório
$ git clone https://github.com/nop-dev/RocketMovies-api

# Acesse a pasta do projeto no terminal/cmd
$ cd RocketMotes-api

# Instale as dependências
$ npm install

# Execute as migrations
$ npm run migrate

# Execute a aplicação em modo de desenvolvimento (nodemon)
$ npm run dev
```

## 🗺️ Rotas

### Rotas de Usuários :bust_in_silhouette:

| Método | Rota| **Descrição**| Parâmetros | Observação |
| --- | --- | --- | --- | --- |
| POST | /users/create | Cria um novo usuário | `name`, `email`, `password` | enviar dados no `body` da requisição |
| PUT | /users/:user_id | Atualiza um usuário específico | `name`, `email`, `old_password`, `new_password`(opcional) | Enviar `user_id` no `params` e demais dados no `body` da requisição |
| DELETE | /users/delete/:user_id | Deleta um usuário | `user_id`, `password` | enviar `user_id` nos `params` e `password` no `body` da requisição |

### Rotas das Notas :airplane:

| Método | Rota| **Descrição**| Parâmetros | Observação |
| --- | --- | --- | --- | --- |
| GET | /notes/:user_id/showNotes | Mostra as notas criadas por um usuário específico | `user_id`, `password` | enviar `user_id` no `params` e `password` pelo `body` da requisição |
| POST | /notes/:user_id/createNote | Cria uma nota | `user_id`, `name`, `title`, `description`, `rating` |  enviar o `user_id` no `params` e demais dados no `body` da requisição |
| PUT | /notes/updateNote/:note_id | Atualiza uma nota  | `note_id`, `user_id`, `password`, `title`, `rating` | enviar `note_id` no `params` e demais dados no `body` da requisição |
| DELETE | /notes/deleteNote/:note_id | Deleta uma nota específica | `note_id`, `user_id`, `password` | enviar `note_id` no `params` e demais dados no `body` da requisição |

### Rotas das Tags :triangular_flag_on_post:

| Método | Rota| **Descrição**| Parâmetros | Observação |
| --- | --- | --- | --- | --- |
| POST | /notes/tags/:user_id/createtag/:note_id | Cria uma tag | `user_id`, `tag_id`, `tagName` |  enviar o `user_id` e `note_id` no `params` e `tagName` no `body` da requisição |
| PUT | /notes/tags/:user_id/updatetag/:tag_id | Atualiza uma tag  | `user_id`, `tag_id`, `newTagName` | enviar `user_id` e `tag_id` no `params` e `newTagName` no `body` da requisição |
| DELETE | /notes/tags/:user_id/deletetag/:tag_id | Deleta uma tag específica | `user_id`, `tag_id` | enviar `use_id` e `tag_id` no `params` |

---

| Nop-Dev, 2024 :rocket: |
| --- |

Deixe sua ⭐️ nesse repositório se você gostou do FocusTimer! Seu apoio é muito valioso para mim! 🚀
