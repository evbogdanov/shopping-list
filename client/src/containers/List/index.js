import React from 'react';
import { Link } from 'react-router-dom';
import Query from '../../graphql/Query';
import { GET_ITEMS } from './queries';

const Items = ({ error, loading, data }) => {
  if (error) return <p>Error</p>;
  if (loading || !data) return <p>Loading...</p>;

  const items = data.items.map(({ id, name }) => (
    <li key={id}>
      <Link to={`/item/${id}`}>{name}</Link>
    </li>
  ));
  return <ul>{items}</ul>;
};

const List = () => {
  return (
    <>
      <h1>Shopping list</h1>
      <Query query={GET_ITEMS}>
        <Items />
      </Query>
    </>
  );
};

export default List;
