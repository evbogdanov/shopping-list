const db = require('../db');

module.exports = {
  // Queries
  item: async ({ id }) => await db.getItem(id),
  items: async () => await db.getItems(),

  // Mutations
  createItem: async ({ input }) => await db.createItem(input),
  updateItem: async ({ id, input }) => await db.updateItem(id, input),
  deleteItem: async ({ id }) => await db.deleteItem(id)
};
