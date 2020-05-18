import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";

const Message = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
        <Jumbotron>
          <h1>Message your Dr</h1>
          <p>type Message Here:
          </p>
          <button> <Link to={"/main/"}>
              Back to Main
                      </Link></button>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

export default Message;
