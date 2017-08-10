import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login, Register, About, NotFound } from '../containers';
import { Header, Sidebar, Footer } from '../components';
import { observer } from 'mobx-react';
import { deviceType } from '../stores';

const App = observer(class App extends React.Component {

  componentWillMount() {
    deviceType.checkDevice();
  }

  // checkDevice() {
  //   const filter = ['iphone','ipod','android','blackberry','windows ce','nokia','webos','opera mini','sonyericsson','opera mobi','iemobile'];
  //   let deviceType = 'PC';
  //   for(let i=0; i<filter.length; i++) {
  //     if (navigator.userAgent.toLowerCase().indexOf(filter[i]) !== -1) {
  //       deviceType = 'MOBILE';
  //       break;
  //     }
  //   }
  //   return deviceType;
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