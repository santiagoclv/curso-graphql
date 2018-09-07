import React, { Component } from 'react';
import { Redirect } from "react-router";

import currentUser from '../queries/currentUser.graphql';

class AuthForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
      ended: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    let { mutate } = this.props;
    let { email, password} = this.state;

    mutate({
        variables: {
            email,
            password
        },
        refetchQueries: [{ query: currentUser }],
        update: () => {
          this.setState({ ended : true });
        }
    });
}

  render() {

    if(this.state.ended){
      return <Redirect to="/" />
    }

    return (
      <div className="row" >
        <form className="col s4" >
          <div className="input-field">
            <label>Email</label>
            <input 
              value={this.state.email}
              onChange={ e => this.setState({ email : e.target.value }) }
            />
          </div>
          <div className="input-field">
            <label>Password</label>
            <input 
              value={this.state.password}
              onChange={ e => this.setState({ password : e.target.value }) }
            />
          </div>
          <buttom className="btn" onClick={this.onSubmit} >Submit</buttom>
        </form>
      </div>
    )
  }
}

export default AuthForm;
