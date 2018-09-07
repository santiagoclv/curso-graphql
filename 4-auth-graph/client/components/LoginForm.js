import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import AuthForm from "./AuthForm";

import login from '../mutations/login.graphql';

class LoginForm extends Component {
  render() {

    const {mutate} = this.props;

    return (
      <div>
        <h3>Login</h3>
        <AuthForm mutate={mutate.bind(this)} />
      </div>
    )
  }
}

export default graphql(login)(LoginForm);

