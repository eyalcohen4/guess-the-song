import React, { Component } from 'react';
import hello from 'hellojs';
import helloHelper from '../../auth';

class Login extends Component {
 constructor(props) {
   super(props);
   this.state = {
     user: null,
   }
 }

 render() {
    return (
      <div>
        <button onClick={() => hello.login('facebook') }>Login</button>
      </div>
    );
  }

}

export default Login;
