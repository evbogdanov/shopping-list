const express = require('express');
const bodyParser = require('body-parser');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

// Temporary solution for storing items. Later I'll switch to SQL
const ITEMS = [];
let ID = 1;

app.use(
  '/graphql',
  expressGraphql({
    graphiql: true,

    schema: buildSchema(`
      type Item {
        id: ID!
        name: String!
        price: Int!
        quantity: Int!
        purchased: Boolean!
      }

      input ItemInput {
        name: String!
        price: Int!
        quantity: Int!
        purchased: Boolean!
      }

      type RootQuery {
        items: [Item!]!
      }

      type RootMutation {
        createItem(input: ItemInput): Item
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),

    // Resolvers
    rootValue: {
      items: () => {
        return ITEMS;
      },
      createItem: ({ input }) => {
        const item = {
          id: ID++,
          ...input
        };
        ITEMS.push(item);
        return item;
      }
    }
  })
);

app.listen(8888);
