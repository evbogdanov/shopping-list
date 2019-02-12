import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import graphqlClient from '../../graphqlClient';
import { GET_ITEMS } from './queries';

class Items extends Component {
  state = {
    data: null
  };

  executeQuery = async () => {
    try {
      const data = await graphqlClient.request(GET_ITEMS);
      this.setState({ data });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.executeQuery();
  }

  render() {
    if (!this.state.data) return <p>Loading...</p>;
    const items = this.state.data.items.map(({ id, name }) => (
      <li key={id}>
        <Link to={`/item/${id}`}>{name}</Link>
      </li>
    ));
    return <ul>{items}</ul>;
  }
}

const List = () => {
  return (
    <>
      <h1>Shopping list</h1>
      <Items />
    </>
  );
};

export default List;
