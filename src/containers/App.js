import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login, Register, About, NotFound } from '../containers';
import { Header, Sidebar, Footer } from '../components';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className='container'>
          <Header />
          <section className='content'>
            <Sidebar />
            <Switch>
              <Route exact={true} path='/' component={Home}/>
              <Route path='/About' component={About} data='data'/>
              <Route path='/login' component={Login}/>
              <Route path='/register' component={Register}/>
              <Route component={NotFound} />
            </Switch>
          </section>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;