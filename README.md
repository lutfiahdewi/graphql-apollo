# GraphQL API build in Apollo Server

This app using build using nexus to make the GraphQL schema from the code. Developer should write the code first, then nexus would generate the schema. Run this code to generate the schema:
```bash
npm run generate
```
Further details:
 * GraphQL API (TS + apollo): https://www.howtographql.com/typescript-apollo/0-introduction/
 * Nexus for code generator : https://nexusjs.org/docs/
 * Prisma for ORM : https://www.prisma.io/docs/orm

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
There are two version of apollo server, v3 and v4. Currently transitioning from v3 to v4. For running Apollo Server v3:
</p>

```bash
npm run dev
```
**(THIS APP USING v4)**
<p>
For running Apollo Server v4 :
</p>

```bash
npm run dev4
```

## Migration through Prisma

script:

```bash
npx prisma migrate dev --name 'added-tags'
```

## Set Database for Prisma

Make .env to set connection to the database. This app using SQL Server and database "sobat". Example env file for setting database connection to SQL Server using windows login:
```bash
DATABASE_URL = sqlserver://localhost:1433;database=sobat;integratedSecurity=true;trustServerCertificate=true;
```

## Set .env file

Make an .env file to store DATABASE_URL for accessing database and APP_SECRET for generating JWT.

## Generate GraphQL query and testing

use package GraphQL Generator or install it as chrome extension : https://chrome.google.com/webstore/detail/graphql-query-generator/jmdpimbhelkmbpgdkjgapkegfapaapej

## Example Query

## Example Mutation

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


## Generate DBML from prisma schema

Generating prisma client would also generate DBML that can be use to generate diagram such as ERD.
Source: https://notiz.dev/blog/prisma-dbml-generator
https://www.npmjs.com/package/prisma-dbml-generator
```
npm install -D prisma-dbml-generator
```
