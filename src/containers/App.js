import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Home, Login, Register, About, Bookmark, NotFound } from '../containers';
import { Header, Sidebar, Footer } from '../components';

const App = observer( class App extends React.Component {
  
  render() {
    const deviceType = this.props.deviceType.device;
    return (
      <Router>
        <div className='container'>
          <Header deviceType={deviceType}/>
          <section className='content'>
            <Sidebar />
            <Switch>
              <Route exact={true} path='/' component={ (props) => <Home {...props} deviceType={deviceType} />}/>
              <Route path='/About' component={ (props) => <About {...props} deviceType={deviceType} />}/>
              <Route path='/Bookmark' component={ (props) => <Bookmark {...props} deviceType={deviceType} />}/>              
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
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