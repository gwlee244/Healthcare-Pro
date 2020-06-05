import React, { Component } from "react";
import "./Home.scss";
import "./Test.scss";
import { Link } from "react-router-dom";

import Typed from "react-typed";

class Home extends Component {
  render() {
    return (
      <div className = "whole-page">
      <div className="home-container">
        <div className="wrapper">
          <h1>Healthcare Pro</h1>
        </div>
        <div className="home-snippet">
          Rethinking How We Manage Healthcare
        </div>
       
        <Typed
          strings={[
            "See your prescriptions...",
            "Manage your appointments...",
            "Flexible to use...",
            "See your patient history...",
            "Communicate with your care team..."
          ]}
          typeSpeed={50}
          backSpeed={50}
          backDelay={1000}
          loop
          smartBackspace
        />
        <Link to="/login" className="home">Sign In</Link>
        <Link to="/register" className="home">Create Account</Link>
      </div>
      </div>
    );
  }
}



export default Home;