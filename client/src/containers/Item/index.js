import React from 'react';
import Query from '../../graphql/Query';
import { GET_ITEM } from './queries';

const ItemDetails = ({ item: { name, price, quantity, purchased } }) => (
  <>
    <h1>{name}</h1>
    <p>Price: {price}</p>
    <p>Quantity: {quantity}</p>
    <p>Purchased: {purchased ? 'YES' : 'NO'}</p>
  </>
);

const Item = ({ error, loading, data }) => {
  if (error) return <p>Error</p>;
  if (loading || !data) return <p>Loading...</p>;
  if (!data.item) return <p>No such item</p>;
  return <ItemDetails item={data.item} />;
}

const ItemWrapper = props => {
  const id = props.match.params.id;
  return (
    <Query query={GET_ITEM} variables={{ id }}>
      <Item />
    </Query>
  );
};

export default ItemWrapper;
