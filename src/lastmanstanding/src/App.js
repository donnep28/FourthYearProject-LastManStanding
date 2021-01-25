import React, { Component } from 'react';
import Navbar from './libs/navbar/navbar';
import './App.css';
import { Auth } from 'aws-amplify';
import { Route, BrowserRouter,Switch } from 'react-router-dom';
import LoggedInHomePage from './libs/homePage/loggedInHomePage';
import SignIn from './libs/signIn/signIn';
import SignUp from './libs/signUp/signUp';
import ForgotPassword from './libs/forgotPassword/forgotPassword';
import axios from 'axios';
import Leagues from './libs/leagues/leagues';
import CrestBar from './libs/crestBar/crestBar';

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
    premierLeagueInfo: {},
    gotUser: false
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  async componentDidMount() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
      this.setAuthStatus(true);
    } catch(error) {
      this.setUser(null);
    }
    axios.get('https://8yo67af9d5.execute-api.eu-west-1.amazonaws.com/dev/premierLeagueInfo')
    .then(response => {
        this.setState({premierLeagueInfo: response})
    })
  }
  setIsLoggedIn = async => {
    this.setAuthStatus(true);
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
      gotUser: this.state.gotUser
    }

    return (
      <>
      <CrestBar/>
      <BrowserRouter>
          <Navbar auth={authProps} />
          <div className="App">
            <Switch>
              <Route exact path="/">
                <LoggedInHomePage results={this.state.premierLeagueInfo}/>
              </Route>
              <Route path="/SignIn">
                <SignIn isLoggedIn = {this.setIsLoggedIn} setUser = {this.setUser}/>
              </Route>
              <Route path="/SignUp">
                <SignUp/>
              </Route>
              <Route path="/Profile">
                <h1>My Profile</h1>
              </Route>
              <Route path="/MyLeagues">
                <Leagues user={authProps.user} results={this.state.premierLeagueInfo}/>
              </Route>
              <Route path="/ForgotPassword">
                <ForgotPassword/>
              </Route>
            </Switch>
          </div>
      </BrowserRouter>
      </>
    );
  }
}
export default App;