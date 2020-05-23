import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Col } from '../Grid';
import { Card } from "../Card";
import './RightNav.css';

const RightNav = ({ link1, link2, link3, link4, link5, text1, text2, text3, text4, text5 }) => {
  return (
    <Col size="md-3">
      <Card title="Quick Links">
        <div className="btn-group-vertical">
          <button> <Link to={link1}>
            {text1}
          </Link></button>
          <button> <Link to={link2}>
            {text2}
          </Link></button>
          <button> <Link to={link3}>
            {text3}
          </Link></button>
          <button> <Link to={link4}>
            {text4}
          </Link></button>
          <button> <Link to={link5}>
            {text5}
          </Link></button>
        </div>
      </Card>
    </Col>
  )
};

export default RightNav;
