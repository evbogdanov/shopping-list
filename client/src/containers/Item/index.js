import React, { Component } from 'react';

class Item extends Component {
  render() {
    const id = this.props.match.params.id;
    return <h1>Item with id {id}</h1>;
  }
}

export default Item;
