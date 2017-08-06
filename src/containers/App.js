import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login, Register, About, NotFound } from '../containers';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact={true} path='/' component={Home}/>
            <Route path='/About' component={About}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
