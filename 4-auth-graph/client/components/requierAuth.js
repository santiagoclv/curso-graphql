import React, { Component } from "react";
import { graphql } from 'react-apollo';
import { hashHistory } from "react-router";

import currentUser from '../queries/currentUser.graphql';



export default WrappedComponent => {
  class requierAuth extends Component {

    redirect(){
        const { data } = this.props;
        if(data && !data.loading && !data.user){
            hashHistory.push("/login");
        }
    }

    componentDidUpdate(){
        this.redirect();
    }

    componentDidMount(){
        this.redirect();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUser)(requierAuth);
};