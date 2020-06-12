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
        Healthcare Pro redefines how we manage healthcare! Patients are able to utilize the portal to accomplish tasks that would normally require a phone call, or even multiple phone calls. Patient portals allow registration forms to be completed electronically prior to appointment check-in, keeping front-office work efficient. The ability to easily access and share patient information electronically eases one of the main distractions on physicians’ time today. Patient portals provide the ability for patients to have 24-hour access to connect with their provider by reviewing patient health information, asking and answering questions, and reviewing notes, making the patient-physician relationship closer than ever.
        </div>
        <div className="github">
        <h4 class="font-weight-bold">Keshav</h4>
            <h5 class="mb-3">Fullstack Developer</h5>

            <a href="https://github.com/keshavsavva" class="p-2 m-2 fa-lg tw-ic"><i class="fab fa-github"> </i></a>
            <h4 class="font-weight-bold">Asad</h4>
            <h5 class="mb-3">Fullstack Developer</h5>

            <a href="https://github.com/asadrauf" class="p-2 m-2 fa-lg tw-ic"><i class="fab fa-github"> </i></a>
            <h4 class="font-weight-bold">Gene</h4>
            <h5 class="mb-3">Frontend Developer</h5>

            <a href="https://github.com/gwlee244" class="p-2 m-2 fa-lg tw-ic"><i class="fab fa-github"> </i></a>
            <h4 class="font-weight-bold">Alex</h4>
            <h5 class="mb-3">Fullstack Developer</h5>

            <a href="https://github.com/alexcoulter" class="p-2 m-2 fa-lg tw-ic"><i class="fab fa-github"> </i></a>
            <h4 class="font-weight-bold">Diantai</h4>
            <h5 class="mb-3">Frontend Developer</h5>

            <a href="https://github.com/Alteredskull" class="p-2 m-2 fa-lg tw-ic"><i class="fab fa-github"> </i></a>
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