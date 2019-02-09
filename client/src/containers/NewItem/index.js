import React, { Component } from 'react';

import Input from '../../components/Input/';

class NewItem extends Component {
  state = {
    name: '',
    price: 0,
    quantity: 0,
    purchased: false
  };

  handleChange = event => {
    const key = event.target.name;
    if (key === 'purchased') {
      this.setState(prevState => ({ purchased: !prevState.purchased }));
    } else {
      this.setState({ [key]: event.target.value });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, price, quantity, purchased } = this.state;
    const query = `
mutation {
  createItem(input: {name: "${name}", price: ${price}, quantity: ${quantity}, purchased: ${purchased}}) {
    id
    name
    price
    quantity
    purchased
  }
}
`;
    fetch('/graphql', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <>
        <h1>Create new item</h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <Input
              name="name"
              placeholder="Name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <Input
              name="price"
              placeholder="Price"
              type="number"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <Input
              name="quantity"
              placeholder="Quantity"
              type="number"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <label htmlFor="purchased">
              Purchased:{' '}
              <input
                name="purchased"
                id="purchased"
                type="checkbox"
                checked={this.state.purchased}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <button type="submit">Create</button>
        </form>
      </>
    );
  }
}

export default NewItem;
