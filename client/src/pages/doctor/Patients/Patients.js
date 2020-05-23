import React from "react";
import { Col, Row, Container } from "../../../components/Grid";
import Jumbotron from "../../../components/Jumbotron";
import { Link } from "react-router-dom";
import  RightNav  from "../../../components/RightNav";

const Patients = () => (
  <Container fluid>
    <Row>
      <Col size="md-9">
        <Jumbotron>
          <h1>Your Patients</h1>
          <h1>
            <span>info on patients
            </span>
          </h1>
          <button> <Link to={"/doctor/home"}>
              Back to Main
                      </Link></button>
        </Jumbotron>
      </Col>
      <RightNav
        link1={"/doctor/patients"}
        text1={"Patients"}
        link2={"/doctor/connect"}
        text2={"Connect"}
        link3={"/doctor/schedule"}
        text3={"Schedule"}
        link4={"/doctor/profile"}
        text4={"Profile"} 
        link5={"/doctor/home"}
        text5={"Main Page"} />
    </Row>
  </Container>
);

export default Patients;
