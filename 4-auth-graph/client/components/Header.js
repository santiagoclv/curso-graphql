import React, { Component } from "react";
import { Link } from "react-router";
import { graphql } from 'react-apollo';

import logout from '../mutations/logout.graphql';

class Header extends Component {


  logout(){
    const {mutate} = this.props;

    mutate();
  }

  renderBurron() {
    const { loading, user } = this.props;

    if (loading) {
      return <div />;
    }

    if (user) {
      return (
        <div className="right">
          <li>
            <a onClick={this.logout.bind(this)}>Logout</a>
          </li>
        </div>
      );
    } else {
      return (
        <div className="right">
          <li>
            <Link to="/singup">Singup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-log left">
            Home
          </Link>
          {this.renderBurron()}
        </div>
      </nav>
    );
  }
}

export default graphql(logout)(Header);