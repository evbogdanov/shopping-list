const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');

const db = require('./db');
const resolvers = require('./resolvers');

const schema = buildSchema(
  fs.readFileSync(`${__dirname}/schema/schema.graphql`).toString()
);

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
  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue: resolvers,
      graphiql: true
    })
  );
  app.listen(8888);
}

main();
