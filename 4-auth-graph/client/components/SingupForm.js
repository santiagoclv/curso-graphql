import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import AuthForm from "./AuthForm";

import singup from '../mutations/singup.graphql';

class SingupForm extends Component {
  render() {
    const {mutate, error, loading} = this.props;

    return (
      <div>
        <h3>Singup</h3>
        <AuthForm mutate={mutate.bind(this)}  error={error} loading={loading} />
      </div>
    )
  }
}

export default graphql(singup)(SingupForm);