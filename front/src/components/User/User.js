import React, { Component } from 'react';
import {Image} from 'react-bootstrap'

class User extends Component {

  constructor(props) {
     super(props);

    this.state = {
      user: props.user,
    }

  }

  render() {
    return (
      <div className="User">
        <span> {this.state.user.displayName} </span>
        <Image src={this.state.user.photoURL} alt={this.state.user.displayName} responsive rounded/>
      </div>
    );
  }
}

export default User;
