## Instalar dependências:

Entre no arquivo **.env.example** copie a estrutura e crie seu próprio arquivo **.env** com suas variáveis locais para que a aplicação possa funcionar corretamente.

```bash
# caso use npm
npm install

# para rodar as migrações localmente
npx prisma migrate dev

# caso você queira rodar a aplicação localmente
npm run dev

```

## **Endpoints**

Regras de acesso:

```javascript
None < User < Admin;
```

```javascript
L < A12 < A14 < A16 < A18;
```

| HTTP Method | Description              | Endpoint                                       | Authentication Required | Acess Level |
| ----------- | ------------------------ | ---------------------------------------------- | ----------------------- | ----------- |
| POST        | Login user               | `/login`                                       | No Authentication       | None        |
| POST        | Register user            | `/user`                                        | No Authentication       | None        |
| GET         | Get users                | `/user`                                        | No Authentication       | None        |
| GET         | Get user                 | `/user/:id`                                    | No Authentication       | None        |
| PATCH       | Update user              | `/user/:id`                                    | Authenticated           | User        |
| DELETE      | Delete user              | `/user/:id`                                    | Authenticated           | User        |
| --          | --                       | --                                             | --                      | --          |
| GET         | List all avatars         | `/avatar`                                      | No Authentication       | None        |
| GET         | Retrieve avatar          | `/avatar/:id`                                  | Authenticated           | None        |
| --          | --                       | --                                             | --                      | --          |
| GET         | List all categories      | `/category`                                    | No Authentication       | None        |
| GET         | Retrieve category        | `/category/:id`                                | Authenticated           | None        |
| --          | --                       | --                                             | --                      | --          |
| POST        | Create card              | `/card`                                        | Authenticated           | User        |
| GET         | List all cards           | `/card`                                        | Authenticated           | User        |
| GET         | Retrieve card            | `/card/:id`                                    | Authenticated           | User        |
| PATCH       | Update card              | `/card/:id`                                    | Authenticated           | User        |
| DELETE      | Delete card              | `/card/:id`                                    | Authenticated           | User        |
| --          | --                       | --                                             | --                      | --          |
| POST        | Create profile           | `/user/profile`                                | Authenticated           | User        |
| GET         | List all profiles        | `/user/profile`                                | Authenticated           | User        |
| GET         | Retrieve profile         | `/user/profile/:id`                            | Authenticated           | User        |
| PATCH       | Update profile           | `/user/profile/:id`                            | Authenticated           | User        |
| DELETE      | Delete profile           | `/user/profile/:id`                            | Authenticated           | User        |
| --          | --                       | --                                             | --                      | --          |
| POST        | Create favorite          | `/user/profile/myList`                         | Authenticated           | User        |
| GET         | List all favorites       | `/user/profile/myList/:profileId`              | Authenticated           | User        |
| DELETE      | Delete favorite          | `/user/profile/myList/:id`                     | Authenticated           | User        |
| --          | --                       | --                                             | --                      | --          |
| POST        | Create restriction       | `/user/profile/restriction`                    | Authenticated           | User        |
| GET         | List all restrictions    | `/user/profile/restriction/:profileId`         | Authenticated           | User        |
| DELETE      | Delete restriction       | `/user/profile/restriction/:id`                | Authenticated           | User        |
| --          | --                       | --                                             | --                      | --          |
| GET         | List movie               | `/movie/:id?`                                  | Authenticated           | User        |
| GET         | List all movies          | `/movie?category=***&age=***`                  | Authenticated           | User        |
| --          | --                       | --                                             | --                      | --          |
| GET         | List serie               | `/serie/:id`                                   | Authenticated           | User        |
| GET         | List all series          | `/serie?category=***&age=***`                  | Authenticated           | User        |
| --          | --                       | --                                             | --                      | --          |
| GET         | List season              | `/serie/:serieId/season/:id`                   | Authenticated           | User        |
| GET         | List all seasons         | `/serie/:serieId/season`                       | Authenticated           | User        |
| --          | --                       | --                                             | --                      | --          |
| GET         | List episode             | `/serie/:serieId/season/:seasonId/episode/:id` | Authenticated           | User        |
| GET         | List all seasons         | `/serie/:serieId/season/:seasonId/episode`     | Authenticated           | User        |
| --          | --                       | --                                             | --                      | --          |
| POST        | Create watching Movie    | `//user/profile/watchingMovie`                 | Authenticated           | User        |
| GET         | List all watching Movies | `//user/profile/watchingMovie/:profileId`      | Authenticated           | User        |
| DELETE      | Delete watching Movie    | `//user/profile/watchingMovie/:id`             | Authenticated           | User        |
| --          | --                       | --                                             | --                      | --          |
| POST        | Create watching Serie    | `/user/profile/watchingSerie`                  | Authenticated           | User        |
| GET         | List all watching Series | `/user/profile/watchingSerie/:profileId`       | Authenticated           | User        |
| DELETE      | Delete watching Serie    | `/user/profile/watchingSerie/:id`              | Authenticated           | User        |

Obs: verifique se as variáveis de ambiente estarão com a **PORT** correta!

## Diagrama do Der:

![DB Diagram](/DER.png)
