import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Home, Login, Register, About, NotFound } from '../containers';
import { Header, Sidebar, Footer } from '../components';
// import { deviceType } from '../stores';
// import $ from 'jquery';

const App = observer( class App extends React.Component {

  // componentWillMount() {
  //   deviceType.checkDevice();
  //   $(window).resize(() => {
  //     deviceType.checkDevice();
  //   });
  // }
  
  render() {
    return (
      <Router>
        <div className='container'>
          <Header />
          <section className='content'>
            <Sidebar />
            <Switch>
              <Route exact={true} path='/' component={Home}/>
              <Route path='/About' component={About} />
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
});

export default App;