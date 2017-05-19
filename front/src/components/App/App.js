import React, { Component } from 'react';
import firebase from 'firebase';

import Api from '../../api';

import Header from '../Header/Header';
import User from '../User/User';
import Quiz   from '../Quiz/Quiz';

import './App.css';

class App extends Component {

  constructor(props) {
     super(props);

    this.state = {
      level: null,
      authed: false,
      loading: null,
      levelNumber: 0,
      user: props.user,
    }

    this.getLevel = this.getLevel.bind(this);
  }

  componentDidMount() {
    this.listener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }

  componentWillMount() {
    this.getLevel();
  }

  componentWillUnmount() {
    this.listener();
  }

  getLevel(resetLevelNumber) {
    if (!resetLevelNumber) {
      this.setState({
        levelNumber: this.state.levelNumber + 1
      });
    } else {
      this.setState({
        levelNumber: 1
      });
    }

    Api.getLevel().then(level => {
          return this.setState({
            level,
          });
      });
  }

  render() {
    if (!this.state.level) {
      return <div> Loading ... </div>
    }

    return (
      <div className="App">
        <Header levelNumber={this.state.levelNumber} />
        <Quiz level={this.state.level} getLevel={this.getLevel} />
      </div>
    );
  }
}

export default App;
