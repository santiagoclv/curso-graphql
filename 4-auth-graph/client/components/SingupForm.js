import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import AuthForm from "./AuthForm";

import singup from '../mutations/singup.graphql';

class SingupForm extends Component {

  constructor(props){
    super(props);

    this.redirect = this.redirect.bind(this);
  }

  redirect(){
    window.location.href = "/#/login";
  }

  render() {
    const {mutate} = this.props;

    return (
      <div className="row">
        <h3>Singup</h3>
        <AuthForm mutate={mutate.bind(this)}  redirect={this.redirect} />
      </div>
    )
  }
}

export default graphql(singup)(SingupForm);