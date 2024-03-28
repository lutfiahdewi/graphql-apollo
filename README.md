# GraphQL API build in Apollo Server

## Build
`npm install `
Generate prisma schema (create .env first for connect t db)
`npx prisma generate`


## Migration through Prisma
script: 
`npx prisma migrate dev --name added-tags`

## Sets Database for Prisma
make .env and read docs :v

## Generate GraphQL query and testing
use package GraphQL Generator or install it as chrome extension : https://chrome.google.com/webstore/detail/graphql-query-generator/jmdpimbhelkmbpgdkjgapkegfapaapej

## Query

## Mutation

### Create

`mutation{
  createKategori(input: {
    nama: "kategori 123"
    definisi: "definisinya adalah"
  }){
    kategori_id
  }
}`


## Script config
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