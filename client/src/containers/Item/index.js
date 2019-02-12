import React, { Component } from 'react';
import graphqlClient from '../../graphqlClient';
import { GET_ITEM } from './queries';

const ItemDetails = ({ item: { name, price, quantity, purchased } }) => (
  <>
    <h1>{name}</h1>
    <p>Price: {price}</p>
    <p>Quantity: {quantity}</p>
    <p>Purchased: {purchased ? 'YES' : 'NO'}</p>
  </>
);

class Item extends Component {
  state = {
    data: null
  };

  executeQuery = async variables => {
    try {
      const data = await graphqlClient.request(GET_ITEM, variables);
      this.setState({ data });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.executeQuery({ id });
  }

  render() {
    if (!this.state.data) return <p>Loading...</p>;
    if (!this.state.data.item) return <p>No such item</p>;
    return <ItemDetails item={this.state.data.item} />;
  }
}

export default Item;
