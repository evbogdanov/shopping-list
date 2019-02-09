import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_ITEM = gql`
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

const ItemDetails = ({ name, price, quantity, purchased }) => (
  <>
    <h1>{name}</h1>
    <p>Price: {price}</p>
    <p>Quantity: {quantity}</p>
    <p>Purchased: {purchased ? 'YES' : 'NO'}</p>
  </>
);

const Item = props => {
  const id = props.match.params.id;
  return (
    <Query query={GET_ITEM} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        if (!data.item) return <p>No such item</p>;
        return <ItemDetails {...data.item} />;
      }}
    </Query>
  );
};

export default Item;
