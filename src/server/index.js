const express = require('express');
const bodyParser = require('body-parser');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const db = require('./db');

const schema = buildSchema(
  fs.readFileSync(`${__dirname}/schema/schema.graphql`).toString()
);

function handleGraphql() {
  return expressGraphql({
    graphiql: true,
    schema,

    // Resolvers
    rootValue: {
      // Queries
      item: async ({ id }) => await db.getItem(id),
      items: async () => await db.getItems(),

      // Mutations
      createItem: async ({ input }) => await db.createItem(input),
      deleteItem: async ({ id }) => await db.deleteItem(id)
    }
  });
}

async function main() {
  try {
    await db.createTableItems();
  } catch (err) {
    console.error(err);
    return;
  }
  console.log('Database created');

  const app = express();
  app.use(bodyParser.json());
  app.use('/graphql', handleGraphql());
  app.listen(8888);
}

main();
