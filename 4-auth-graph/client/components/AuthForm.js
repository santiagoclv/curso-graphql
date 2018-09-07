import React, { Component } from 'react';
import { Redirect } from "react-router";

import currentUser from '../queries/currentUser.graphql';

class AuthForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    let { mutate, redirect } = this.props;
    let { email, password} = this.state;

    mutate({
        variables: {
            email,
            password
        },
        refetchQueries: [{ query: currentUser }]
    }).then( (result) => {
        console.log(result);
        redirect();
    }).catch( ({graphQLErrors}) => {
        const errors = graphQLErrors.map(err => err.message);
        this.setState({errors});
    });
  }

  onChange({ target : {value, id}}){
    this.setState({
      [id]: value
    });
  }

  render() {

    const { email, password, errors } = this.state;


    return (
      <div className="row" >
        <form onSubmit={this.onSubmit} className="col s6" >
          <div className="input-field">
            <input 
              placeholder="Email"
              id="email"
              type="email"
              className="validate"
              value={email}
              onChange={this.onChange}
            />
            <span className="helper-text" data-error="Not Valid Email" data-success="Valid email"></span>
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              id="password"
              type="password"
              className="validate"
              value={password}
              onChange={this.onChange}
            />
          </div>

          <div style={{color: 'red'}} >
            { errors && errors.map( err =>
              <div key={err}>
                {err}
              </div>
            )}
          </div>
          <input className="waves-effect waves-light btn-large" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AuthForm;
