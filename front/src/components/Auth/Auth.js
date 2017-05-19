import React, { Component } from 'react';
import { BrowserHistory } from 'react-router';
import firebaseui from 'firebaseui';
import firebase from 'firebase';
import { writeUserData, firebaseAuth, firebaseDB } from '../../helpers/firebase';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.db = firebaseDB;
    this.authUI = new firebaseui.auth.AuthUI(firebaseAuth);

  }

  componentDidMount() {
    let uiConfig = {
      'callbacks': {
        'signInSuccess': (user) => {
            writeUserData(user.uid, user.displayName, user.email, user.photoURL)
            this.props.onSignIn(user);

            return false;
        },
      },
      'signInOptions': [
         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
         firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ]
    }
    this.authUI.start('#firebase-auth', uiConfig)
  }

  componentWillUnmount() {
    this.authUI.reset();
  }

  render() {
    return (
      <div id="firebase-auth"></div>
    )
  }
}

export default Auth;
