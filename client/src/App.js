import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Projects from './containers/Projects/Projects';
import './App.css';

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