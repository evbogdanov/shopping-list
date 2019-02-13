import React, { Component } from 'react';
import client from './client';

const INITIAL_STATE = {
  error: null,
  loading: false,
  data: null
};

class Mutation extends Component {
  state = { ...INITIAL_STATE };

  executeMutation = async (variables) => {
    const { mutation } = this.props;
    this.setState({
      ...INITIAL_STATE,
      loading: true
    });
    try {
      const data = await client.request(mutation, variables);
      this.setState({ data });
    } catch (error) {
      console.error(error);
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        error: this.state.error,
        loading: this.state.loading,
        data: this.state.data,
        executeMutation: this.executeMutation
      });
    });

    return childrenWithProps;
  }
}

export default Mutation;
