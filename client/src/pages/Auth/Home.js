import React, { Component } from "react";
import "./Home.scss";
import "./Test.scss";
import classes from "./Technologies.scss";
import { Link } from "react-router-dom";
import TextLoop from "react-text-loop";
import javascript from "../../img/javascript.png";
import react from "../../img/react.png";
import redux from "../../img/redux.png";
import node from "../../img/node.png";
import mongodb from "../../img/mongo.png";
import sass from "../../img/sass.png";
import materialui from "../../img/materialui.png";
import heroku from "../../img/heroku.png";

import Typed from "react-typed";
const imgs = [javascript, react, redux, node, mongodb, sass, materialui, heroku];

class Home extends Component {
  render() {
    return (
      <div className = "whole-page">
        <p>
          <p className="textloop">
          Technologies that we used to develop this application 
          </p>
        <TextLoop springConfig={{ stiffness: 180, damping: 8 }}>
          <div style={{ display: "flex" }}>
            {" "}
            <img src={imgs[0]} alt="pic" className={classes.img} style={{ width: "30px" }} />
            <span className={classes.title}>Javascript</span>
          </div>
          <div style={{ display: "flex" }}>
            <img src={imgs[1]} alt="pic" className={classes.img} style={{ width: "30px" }} />
            <span className={classes.title}>React</span>
          </div>
          <div style={{ display: "flex" }}>
            {" "}
            <img src={imgs[2]} alt="pic" className={classes.img} style={{ width: "20px" }} />
            <span className={classes.title}>Redux</span>
          </div>
          <div style={{ display: "flex" }}>
            <img
              src={imgs[3]}
              alt="pic"
              style={{ width: "30px" }}
              className={classes.img}
            />
            <span className={classes.title}>Node</span>
          </div>
          <div style={{ display: "flex" }}>
            <img src={imgs[4]} alt="pic" style={{ width: "30px" }} className={classes.img} />
            <span className={classes.title}>Mongo</span>
          </div>
          <div style={{ display: "flex" }}>
            <img src={imgs[5]} alt="pic" style={{ width: "30px" }} className={classes.img} />
            <span className={classes.title}>Sass</span>
          </div>
          <div style={{ display: "flex" }}>
            <img src={imgs[6]} alt="pic" style={{ width: "30px" }} className={classes.img} />
            <span className={classes.title}>Material UI</span>
          </div>
          <div style={{ display: "flex" }}>
            <img src={imgs[7]} alt="pic" style={{ width: "30px" }} className={classes.img} />
            <span className={classes.title}>Heroku</span>
          </div>
        </TextLoop>
        </p>
      <div className="home-container">
        <div className="wrapper">
          <h1>Healthcare Pro</h1>
        </div>
        <div className="home-snippet">
        Healthcare Pro redefines how we manage healthcare! Patients are able to utilize the portal to accomplish tasks that would normally require a phone call, or even multiple phone calls. Patient portals allow registration forms to be completed electronically prior to appointment check-in, keeping front-office work efficient. The ability to easily access and share patient information electronically eases one of the main distractions on physicians’ time today. Patient portals provide the ability for patients to have 24-hour access to connect with their provider by reviewing patient health information, asking and answering questions, and reviewing notes, making the patient-physician relationship closer than ever.
        </div>
        
        <Typed className="typed"
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
        <div className="buttonSide">
        <Link to="/login" className="home">Sign In</Link>
        <i class="fas fa-heartbeat fa-3x"></i>
        <Link to="/register" className="home">Create Account</Link>
        </div>
      </div>
      <div className="github">
        <div className="gitId">
          <h4 class="font-weight-bold">Keshav</h4>
          <h5>Fullstack Developer</h5>
          <a href="https://github.com/keshavsavva" class="p-2 m-2 fa-lg tw-ic"><i class="fab fa-github"> </i></a>
        </div>
        <div className="gitId">
          <h4 class="font-weight-bold">Asad</h4>
          <h5>Fullstack Developer</h5>
          <a href="https://github.com/asadrauf" class="p-2 m-2 fa-lg tw-ic"><i class="fab fa-github"> </i></a>
        </div>
        <div className="gitId">
          <h4 class="font-weight-bold">Gene</h4>
          <h5>Frontend Developer</h5>
          <a href="https://github.com/gwlee244" class="p-2 m-2 fa-lg tw-ic"><i class="fab fa-github"> </i></a>
        </div>
        <div className="gitId">
          <h4 class="font-weight-bold">Alex</h4>
          <h5>Fullstack Developer</h5>
          <a href="https://github.com/alexcoulter" class="p-2 m-2 fa-lg tw-ic"><i class="fab fa-github"> </i></a>
        </div>
        <div className="gitId">
          <h4 class="font-weight-bold">Diantai</h4>
          <h5>Frontend Developer</h5>
          <a href="https://github.com/Alteredskull" class="p-2 m-2 fa-lg tw-ic"><i class="fab fa-github"> </i></a>
        </div>
        </div>
       
      </div>
    );
  }
}



export default Home;