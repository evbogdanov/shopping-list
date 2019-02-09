import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import List from '../List/';
import NewItem from '../NewItem/';
import Item from '../Item/';
import NotFound from '../../components/NotFound/';
import Header from '../../components/Header/';
import Content from '../../components/Content/';

import { GlobalStyle } from './styled';

const client = new ApolloClient();

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <>
            <GlobalStyle />
            <Header />
            <Content>
              <Switch>
                <Route exact path="/" component={List} />
                <Route exact path="/new" component={NewItem} />
                <Route path="/item/:id" component={Item} />
                <Route component={NotFound} />
              </Switch>
            </Content>
          </>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
