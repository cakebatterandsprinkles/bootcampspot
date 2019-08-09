import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import SignUp from './components/AccountLayout/Register/SignUp';
import SignIn from './components/AccountLayout/Register/SignIn';
import './App.css';

const App = () => 
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/" component={SignUp}/>
        <Route exact path="/signin" component={SignIn}/>
      </Switch>
    </Fragment>
  </Router>
export default App;
