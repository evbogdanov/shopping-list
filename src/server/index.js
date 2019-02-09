const express = require('express');
const bodyParser = require('body-parser');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  expressGraphql({
    graphiql: true,
    schema: buildSchema(`
      type RootQuery {
        # Returns a list of all items in my shopping list
        # TODO: make it Item type
        items: [String!]!
      }

      type RootMutation {
        createItem(name: String): String
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    // Resolvers
    rootValue: {
      items: () => {
        return ['one', 'two', 'three'];
      },
      createItem: args => {
        const itemName = args.name;
        return itemName;
      }
    }
  })
);

app.listen(8888);
