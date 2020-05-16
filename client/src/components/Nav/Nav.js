import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Col } from '../Grid';
import './Nav.css';

const Nav = (props) => {
  let greeting;

  if (props.user === null) {
		greeting = <p>Hello guest</p>
	} else if (props.user.firstName) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.firstName}</strong>
			</Fragment>
		)
	} else if (props.user.username) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.username} </strong>
			</Fragment>
		)
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <Col size="md-6 sm-6">
        <Link to="/" className="navbar-brand">React Reading List With Auth</Link>
      </Col>
      <Col size="md-6 sm-6">
        <div className="float-right">
        {greeting} - <Link to="#" className="logout" onClick={props.logout}>Logout</Link>
        </div>
      </Col>
    </nav>
  )
};

export default Nav;
