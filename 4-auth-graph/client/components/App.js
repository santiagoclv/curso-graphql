import React, { Component } from 'react';
import { graphql } from 'react-apollo'

import currentUser from '../queries/currentUser.graphql';

import Header from "./Header";

class App extends Component {
  render() {

    if (!!this.props.data && !!this.props.data.loading) return <div className="loading">Loading...</div>;

    const {user} = this.props.data;

    return (
      <div>
         <Header user={user} />
         {this.props.children}
      </div>
    )
  }
}

export default graphql(currentUser)(App);