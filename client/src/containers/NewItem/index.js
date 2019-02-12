import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import graphqlClient from '../../graphqlClient';
import Input from '../../components/Input/';
import { CREATE_ITEM } from './queries';

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
    this.props.executeQuery({ ...this.state });
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

class NewItem extends Component {
  state = {
    data: null
  };

  executeQuery = async variables => {
    try {
      const data = await graphqlClient.request(CREATE_ITEM, variables);
      this.setState({ data });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    if (!this.state.data) return <Form executeQuery={this.executeQuery} />;
    return <Success {...this.state.data.createItem} />;
  }
}

export default NewItem;
