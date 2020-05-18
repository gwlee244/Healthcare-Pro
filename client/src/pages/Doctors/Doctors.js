import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";

const Doctors = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
        <Jumbotron>
          <h1>Your Doctors</h1>
          <h1>
            <span>info on doctor
            </span>
          </h1>
          <button> <Link to={"/main/"}>
              Back to Main
                      </Link></button>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

export default Doctors;
