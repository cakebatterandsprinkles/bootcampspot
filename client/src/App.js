import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignUp from './components/AccountLayout/Register/SignUp';
import SignIn from './components/AccountLayout/Register/SignIn';
import SignOut from './components/AccountLayout/Register/SignOut';
import Dashboard from './components/MainPage/Dashboard';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ClassProfile from './components/ClassProfile/ClassProfile';
import ProfileDetails from './components/ProfileDetails/ProfileDetails';
import Schedule from './components/Schedule/Schedule';
import Coursework from './components/Coursework/Coursework';
import Resources from './components/Resources/Resources';
import Support from './components/Support/Support';
import PrivateRoute from "./PrivateRoute";
import './App.css';

const App = () => 
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/" component={SignUp}/>
        <Route exact path="/signin" component={SignIn}/>
        <PrivateRoute exact path="/home" component={Dashboard}/>
        <PrivateRoute exact path="/profile" component={ProfilePage}/>
        <PrivateRoute exact path="/profile/:id" component={ProfileDetails}/>
        <PrivateRoute exact path="/class" component={ClassProfile}/>
        <PrivateRoute exact path="/schedule" component={Schedule}/>
        <PrivateRoute exact path="/coursework" component={Coursework}/>
        <PrivateRoute exact path="/resources" component={Resources}/>
        <PrivateRoute exact path="/support" component={Support}/>
        <PrivateRoute exact path="/signout" component={SignOut}/>
      </Switch>
    </Fragment>
  </Router>
export default App;
