import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import List from '../List/';
import NewItem from '../NewItem/';
import Item from '../Item/';
import NotFound from '../../components/NotFound/';
import Header from '../../components/Header/';
import Content from '../../components/Content/';

import { GlobalStyle } from './styled';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
