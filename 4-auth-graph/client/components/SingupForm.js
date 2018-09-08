import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import AuthForm from "./AuthForm";

import singup from '../mutations/singup.graphql';

class SingupForm extends Component {
  render() {
    const {mutate} = this.props;

    return (
      <div className="row">
        <h3>Singup</h3>
        <AuthForm mutate={mutate.bind(this)} redirect="/dashboard" />
      </div>
    )
  }
}

export default graphql(singup)(SingupForm);