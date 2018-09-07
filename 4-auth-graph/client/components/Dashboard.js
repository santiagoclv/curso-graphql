import React, { Component } from "react";

class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Dashboard</span>
              <p>
                Wellcome to the I-Do-Not-Know-Why-I-Have-A-Dashboard
              </p>
            </div>
            <div className="card-action">
              <a >Super Cool</a>
              <a >Not So Cool</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
