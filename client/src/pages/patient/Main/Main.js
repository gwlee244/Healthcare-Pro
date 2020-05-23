import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Container } from "../../../components/Grid";
import { Card } from "../../../components/Card";
import  RightNav  from "../../../components/RightNav";
import SideNav2 from "../../../components/SideNav2"
import { Input, TextArea, FormBtn } from "../../../components/Form";
import API from "../../../utils/API";

function Main() {

  function seedDoctors() {
    API.saveDoc({
      name: "Horace Mansford",
      field: "Orthodontist",
      schools: "Savanna School of Design",
      work: "3 years at the Beauty Institute of Temecula",
      office: "555 Georgi Drive, Raleigh, NC"
    });
    API.saveDoc({
      name: "Sandra Pringles",
      field: "Cardiologist",
      schools: "Duke University for PHd, Syracuse for Undergrad in Premed",
      work: "Heart Surgeon for 10 years at UNC",
      office: "UNC Hospital, 222 Markham Ave, Chapel Hill"
    });
    API.saveDoc({
      name: "Cathy Yorkington",
      field: "Pediatrist",
      schools: "Dr Scholls Academy",
      work: "Primary Specialist at Foothills Foot Specialists",
      office: "499 Fabio Way, Winston-Salem, NC"
    });
    API.saveDoc({
      name: "Larry Knopf",
      field: "Allergy Specialist",
      schools: "UNC Wilmington",
      work: "3 years practicing and another 2 as an unpaid intern",
      office: "653 Beach Way, Wilmington, NC"
    });
    API.saveDoc({
      name: "Mike Conway",
      field: "General Practitioner",
      schools: "Louisville University. Go Cardinals!",
      work: "No experice but I'm a go-getter!",
      office: "777 Bumbleyum Dr, Cary, NC 28888 "
    });
    API.saveDoc({
      name: "Charlie Oggletree",
      field: "Psychiatry",
      schools: "UNC Chapel Hill",
      work: "6 years practicing at my own office",
      office: "466 hwy55 Apex, NC 23353.  If you get to Bojangles, then you've gone too far."
    });
    API.saveDoc({
      name: "John Scofield",
      field: "Geriatric Specialist",
      schools: "Dominion College",
      work: "Over 15 years experience at multiple hospitals and advanced care facilities",
      office: "656 Doughnut Hole Alley, Durham, NC 27517"
    });
    API.saveDoc({
      name: "Selena Rodriguez",
      field: "Radiologist",
      schools: "Michigan State University",
      work: "Worked for 2 years at Michigan State's renowned hospital, then moved accross the country and have spent the last 4 years dedicated to my work at UNC-Chapel Hill",
      office: "UNC Hospital, 236 Markham Ave, Chapel Hill"
    });
    API.saveDoc({
      name: "Andy Dustberg",
      field: "Oncologist",
      schools: "Boston College PhD",
      work: "I've spent the last 6 years providing quality care to members of my community in Graham, NC",
      office: "7005 OndaGround Way, Graham, NC 2777"
    });
    API.saveDoc({
      name: "Jeremy Palvinofski",
      field: "General Medicine",
      schools: "University of Connecticut.  Certificate of Applied Methodology",
      work: "After 10 years of formal education I'm just getting into the workforce and I'm excited to work for you!",
      office: "284 Pastoral trail, Mebane, NC, 37777"
    });
    alert("Seeded");
  }
 

  return (
    <Container fluid>
      <Row>
        
      <Col size="md-9">
          <Card title="Main">
        
          <h1>Main Page</h1>
          <p>Your info
          </p>
          <button onClick={seedDoctors}>Seed</button>
  
          </Card>
        </Col>

        
      {/* <SideNav2 /> */}


       
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
}


export default Main;
