import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_ITEMS = gql`
  query {
    items {
      id
      name
    }
  }
`;

const Items = () => (
  <Query query={GET_ITEMS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      const items = data.items.map(({ id, name }) => (
        <li key={id}>
          <Link to={`/item/${id}`}>{name}</Link>
        </li>
      ));
      return <ul>{items}</ul>;
    }}
  </Query>
);

const List = () => {
  return (
    <>
      <h1>Shopping list</h1>
      <Items />
    </>
  );
};

export default List;
