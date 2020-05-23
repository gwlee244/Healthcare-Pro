/*
	Initial component that will hold all doctor realated
	functionlities
*/
import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Card } from "../../components/Card";
import  RightNav  from "../../components/RightNav";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { withRouter } from "react-router-dom";



class DoctorDashboard extends Component {
	render() {
		return (
      <div>
      <h1>Doctor</h1>
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
       </div>
    //   <Container fluid>
    //   <Row>
    //   <Col size="md-9">
    //       <Card title="Main">
        
    //       <h1>Doctor's Main Page</h1>
    //       <p>Your info
    //       </p>
  
    //       </Card>
    //     </Col>
       
    //     <RightNav
    //     link1={"/doctor/patients"}
    //     text1={"Patients"}
    //     link2={"/doctor/connect"}
    //     text2={"Connect"}
    //     link3={"/doctor/schedule"}
    //     text3={"Schedule"}
    //     link4={"/doctor/profile"}
    //     text4={"Profile"}
    //    />
        
       
    //   </Row>
    // </Container>
		);
	}
}

export default withRouter(DoctorDashboard);
