import React from "react";
import { Col, Row, Container } from "../../../components/Grid";
import { Link } from "react-router-dom";
import  RightNav  from "../../../components/RightNav";

const Appointment = () => (
  <Container fluid>
    <Row>
      <Col size="md-9">
          <h1>Manage Appointments</h1>
          <p>stuff here
          </p>
          <button> <Link to={"/patient/home"}>
              Back to Main
                      </Link></button>
      </Col>
      <RightNav
        link1={"/patient/results"}
        text1={"Medical Results"}
        link2={"/patient/message"}
        text2={"Ask a Question"}
        link3={"/patient/appointment"}
        text3={"Request an Appointment"}
        link4={"/patient/doctors"}
        text4={"Doctor Info"} 
        link5={"/patient/summary"}
        text5={"Health Summary"} />
    </Row>
  </Container>
);

export default Appointment;
