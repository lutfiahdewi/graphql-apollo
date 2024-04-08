# GraphQL API build in Apollo Server

## Build and Run App

```bash
npm install
```

<p>
Generate prisma schema (create .env first for connect t db)
</p>

```bash
npx prisma generate
```

<p>
There are two version of apollo server, v3 and v4. Currently transitioning from v3 to v4, so both version are kept. For running Apollo Server v3:
</p>

```bash
npm run dev
```

<p>
For running Apollo Server v4:
</p>

```bash
npm run dev4
```

## Migration through Prisma

script:

```bash
npx prisma migrate dev --name 'added-tags'
```

## Sets Database for Prisma

make .env and read docs :v

## Generate GraphQL query and testing

use package GraphQL Generator or install it as chrome extension : https://chrome.google.com/webstore/detail/graphql-query-generator/jmdpimbhelkmbpgdkjgapkegfapaapej

## Query

## Mutation

### Create

```bash
mutation{
  createKategori(input: {
    nama: "kategori 123"
    definisi: "definisinya adalah"
  }){
    kategori_id
  }
}
```

### SignUp

<p>Query</p>

```bash
mutation ($email: String!, $password: String!, $username: String!, $is_pegawai: Int) {
    signup (
        email: $email,
        password: $password,
        username: $username,
        is_pegawai: $is_pegawai
    ) {
        token
        user {
            user_id
            username
            email
            is_pegawai
        }
    }
}
```

<p>Input</p>

```bash
{
    "email": "quis",
    "password": "Suspendisse",
    "username": "auctor",
    "is_pegawai": 949
}
```

<br>

## Add authentication
<p>Add resolvers part add this code:</p>

```bash
const { userId } = context;
if (!userId) {  // 1
  throw new Error("Cannot post without logging in.");
}
```

## Authorization
<p>Please login and get the token. Then, add the token in header, choose auth. </p>


## Script config

```bash
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"dev": "ts-node-dev --transpile-only --no-notify --exit-child src/index.ts",
"generate": "ts-node --transpile-only src/schema.ts"
},

"scripts": {
"compile": "tsc",
"dev": "ts-node-dev --respawn ./src/index.ts",
"start": "npm run compile && nodemon ./dist/index.js",
"test": "jest"
},
```
