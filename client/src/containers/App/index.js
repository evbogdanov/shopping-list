import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import List from '../List/';
import Item from '../Item/';
import NotFound from '../../components/NotFound/';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/item/:id" component={Item} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
