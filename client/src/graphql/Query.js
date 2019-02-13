import React, { Component } from 'react';
import client from './client';

const INITIAL_STATE = {
  error: null,
  loading: false,
  data: null
};

class Query extends Component {
  state = { ...INITIAL_STATE };

  executeQuery = async (query, variables) => {
    this.setState({
      ...INITIAL_STATE,
      loading: true
    });
    try {
      const data = await client.request(query, variables);
      this.setState({ data });
    } catch (error) {
      console.error(error);
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    const { query, variables } = this.props;
    if (variables) this.executeQuery(query, variables);
    else this.executeQuery(query);
  }

  render() {
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        error: this.state.error,
        loading: this.state.loading,
        data: this.state.data
      });
    });

    return childrenWithProps;
  }
}

export default Query;
