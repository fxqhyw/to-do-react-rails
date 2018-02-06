import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Signin from './components/Signin/Signin';
import Projects from './containers/Projects/Projects';

class App extends Component {
  render() {

    return (
        <Router>
        <div >
        <Route exact path='/' component={SignIn} />
        <Route exact path='/welcome' component={Projects} />
          </div>     

        </Router>
      
    );
  }
}

export default App;