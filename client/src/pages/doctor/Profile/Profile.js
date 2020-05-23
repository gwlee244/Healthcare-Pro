import React, {useState, useEffect} from "react";
import { Col, Row, Container } from "../../../components/Grid";
import Jumbotron from "../../../components/Jumbotron";
import { Link } from "react-router-dom";
import RightNav from "../../../components/RightNav";
import "../../../index.css";
import { withRouter } from "react-router-dom";
import API from "../../../utils/API";

const Profile = (props) => {
  var doctorId = localStorage.getItem("doctorId");
  const [profile, setProfile] = useState([{name:"", field:"", schools:"", work:"", office:""}]);
  const [formObject, setFormObject] = useState({});

  useEffect(() => {
  console.log(doctorId);
  loadProfile();

  }, []);

  // Loads boxes with previous profile
  function loadProfile() {
    API.getDoc(doctorId)
      .then(res => {
        console.log(res);
        setProfile(res.data[0]);
      })
      .catch(err => console.log(err));
  };


  function handleInputChange(event) {
    // console.log(event.target.value);
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

  function handleSave(event) {
    event.preventDefault();
    console.log(formObject);
    API.updateDoc(doctorId,{
   
      name: formObject.name || document.getElementById("nameText").value,
      field: formObject.field || document.getElementById("fieldText").value,
      schools: formObject.schools || document.getElementById("educationText").value,
      work: formObject.work || document.getElementById("workText").value,
      office: formObject.office || document.getElementById("officeText").value
    })
      .then(res => {
        console.log(res);
        alert("Profile Changes Saved!");
        loadProfile();
      })
      .catch(err => console.log(err.response));

  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-9">
          {/* <Jumbotron> */}
          <div className="profileContainer container jumbotron">
            <h1>Edit Your Profile</h1><br />
            <p>Name:</p>
            <input id="nameText" name="name" defaultValue={profile.name || ""} onChange={handleInputChange} />

            <p>Field/Specializations:</p>
            <textarea id="fieldText" name="field" defaultValue={profile.field} onChange={handleInputChange} />

            <p>Education/Certifications:</p>
            <textarea id="educationText" name="schools" defaultValue={profile.schools} onChange={handleInputChange} />

            <p>Work History:</p>
            <textarea id="workText" name="work" defaultValue={profile.work} onChange={handleInputChange} />

            <p>Office Information:</p>
            <textarea id="officeText" name="office" defaultValue={profile.office} onChange={handleInputChange} />
            <button id="profileEdit" onClick={handleSave}>Save Changes</button>
          </div>

          {/* </Jumbotron> */}
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
}

export default withRouter(Profile);
