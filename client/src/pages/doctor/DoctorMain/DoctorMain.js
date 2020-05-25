import React from "react";
import { Col, Row, Container } from "../../../components/Grid";
import { Card } from "../../../components/Card";
import  RightNav  from "../../../components/RightNav/";

function DoctorMain() {

  return (
    <Container fluid>
      <Row>
      <Col size="md-9">
          <Card title="Main">
        
          <h1>Doctor's Main Page</h1>
          <p>Your info
          </p>
  
          </Card>
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
        text5={"Home"}
       />
        
       
      </Row>
    </Container>
  );
}


export default DoctorMain;
