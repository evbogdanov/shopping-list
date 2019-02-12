export const GET_ITEM = `
  query GetItem($id: ID!) {
    item(id: $id) {
      id
      name
      price
      quantity
      purchased
    }
  }
`;
