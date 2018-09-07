import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import currentUser from '../queries/currentUser.graphql';

import Header from "./Header";

class App extends Component {
  render() {
    const {data, children} = this.props;
    return (
      <div className="container" >
         <Header user={data.user} loading={data.loading} />
         {children}
      </div>
    )
  }
}

export default graphql(currentUser)(App);