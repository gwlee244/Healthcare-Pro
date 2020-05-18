import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";

const Summary = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
        <Jumbotron>
          <h1>Your Health Summary</h1>
         <p>Summary Here</p>
         <button> <Link to={"/main/"}>
              Back to Main
                      </Link></button>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

export default Summary;
