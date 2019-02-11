import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Input from '../../components/Input/';

const CREATE_ITEM = gql`
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

class Form extends Component {
  state = {
    name: '',
    price: 0,
    quantity: 0,
    purchased: false
  };

  handleChange = ({ target: { name, value, checked } }) => {
    let nextValue = value;
    if (name === 'purchased') nextValue = checked;
    if (name === 'price' || name === 'quantity')
      nextValue = parseInt(value, 10);
    this.setState({ [name]: nextValue });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createItem({
      variables: { ...this.state }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Create new item</h1>
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
    );
  }
}

const Success = ({ id, name, price, quantity, purchased }) => (
  <>
    <h1>Item created</h1>
    <h4>
      <Link to={`/item/${id}`}>Go to item</Link>
    </h4>
    <ul>
      <li>Name: {name}</li>
      <li>Price: {price}</li>
      <li>Quantity: {quantity}</li>
      <li>Purchased: {purchased ? 'YES' : 'NO'}</li>
    </ul>
  </>
);

const NewItem = () => (
  <Mutation mutation={CREATE_ITEM}>
    {(createItem, { loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;
      if (data) return <Success {...data.createItem} />;
      return <Form createItem={createItem} />;
    }}
  </Mutation>
);

export default NewItem;
