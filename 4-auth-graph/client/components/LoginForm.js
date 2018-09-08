import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import AuthForm from "./AuthForm";

import login from '../mutations/login.graphql';

class LoginForm extends Component {

  render() {
    const {mutate} = this.props;

    return (
      <div className="row">
        <h3>Login</h3>
        <AuthForm mutate={mutate.bind(this)} redirect="/dashboard" />
      </div>
    )
  }
}

export default graphql(login)(LoginForm);

