import React, { Component } from 'react';
import { firebaseDB, firebaseAuth } from '../../helpers/firebase';

import Header from '../Header/Header';
import Auth   from '../Auth/Auth';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import App from '../App/App';

import './Home.css';

class Home extends Component {
 constructor(props) {
   super(props);
   this.state = {
     user: null,
   }

   this.onSignIn = this.onSignIn.bind(this);
 }

 onSignIn(user) {
    this.setState({ user })
 }

 render() {
    return (
        <div className="App">

        {this.state.user ? '' : <Header />}

          <main className="Home">

              <Login />

          </main>
          <Footer />
        </div>

    );
  }

}

export default Home;
