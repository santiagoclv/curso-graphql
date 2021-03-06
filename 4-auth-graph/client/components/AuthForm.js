import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';

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

  redirect(){
    const { data, redirect, router } = this.props;
    if(!!data && !!data.user){
      router.push(redirect);
    }
  }

  componentDidMount(){
    this.redirect();
  }

  componentDidUpdate(){
    this.redirect();
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
        refetchQueries: [{ query: currentUser }]
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

export default graphql(currentUser)(withRouter(AuthForm));