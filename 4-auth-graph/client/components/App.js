import React, { Component } from 'react';
import { graphql } from 'react-apollo'

import currentUser from '../queries/currentUser.graphql';

import Header from "./Header";

class App extends Component {
  render() {
    const {user, loading} = this.props.data;
    
    return (
      <div>
         <Header user={user} loading={loading} />
         {loading && <div className="loading">Loading...</div>}
         {user && this.props.children}
      </div>
    )
  }
}

export default graphql(currentUser)(App);