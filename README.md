# shopping-list

## Development
```
yarn install
yarn start
```

## Queries

### Get a single item by id
```
query {
  item(id: "1") {
    id
    name
    price
    quantity
    purchased
  }
}
```

### Get all items
```
query {
  items {
    id
    name
    price
    quantity
    purchased
  }
}
```

## Mutations

### Create item
```
mutation {
  createItem(input: {name: "First", price: 1, quantity: 1, purchased: false}) {
    id
    name
  }
}
```

### Update item

```
mutation {
  updateItem(id: 1, input: {name: "Updated", price: 1, quantity: 1, purchased: true}) {
    id
    name
    purchased
  }
}
```

### Delete item
```
mutation {
  deleteItem(id: 1)
}
```
