export const CREATE_ITEM = `
  mutation CreateItem(
    $name: String!
    $price: Int!
    $quantity: Int!
    $purchased: Boolean!
  ) {
    createItem(
      input: {
        name: $name
        price: $price
        quantity: $quantity
        purchased: $purchased
      }
    ) {
      id
      name
      price
      quantity
      purchased
    }
  }
`;
