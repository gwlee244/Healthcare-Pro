import React, { useEffect, Component } from "react";
import { Col, Row, Container } from "../../../components/Grid";
import Jumbotron from "../../../components/Jumbotron";
import { Link } from "react-router-dom";
import RightNav from "../../../components/RightNav";
import API from "../../../utils/API";
import DoctorCard from "../../../components/DoctorCard/DoctorCard";


class Doctors extends Component {
  state = {
    doctors: [],
    filtered: [],
    searchTerm: "",
  };

  componentDidMount() {
    this.getDoctors();
  }
  getDoctors = () => {
    API.getDocs()
      .then(res => {
        console.log(res);
        this.setState({
          doctors: res.data,
          filtered: res.data
        });
        console.log(this.state.filtered);
      })
  };

  handleInputChange = (event) => {
    event.preventDefault();
    const newSearch = event.target.value.toLowerCase();
    console.log(newSearch);
    console.log(this.state.doctors);

    this.setState({
      searchTerm: newSearch
    },
      () => {
        console.log(this.state.searchTerm);
        this.setState({
          filtered: this.state.doctors.filter(dr =>
            dr.name.toLowerCase().includes(this.state.searchTerm) || dr.work.toLowerCase().includes(this.state.searchTerm) || dr.field.toLowerCase().includes(this.state.searchTerm) || dr.office.toLowerCase().includes(this.state.searchTerm) || dr.schools[0].toLowerCase().includes(this.state.searchTerm))

        });
      })
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-9">
            <Jumbotron>
              <h1>Find A Doctor</h1>

              <h4 className="text-info mt-3 text-left">Doctor Search: </h4>
              <input className="form-control mr-sm-2 mb-5" id="searchBox" type="search" placeholder="Search" aria-label="Search"
                onChange={this.handleInputChange}
              //  value={value}
              />

              {this.state.filtered.map((doctor, id) => (
                <DoctorCard
                  key={id}
                  name={doctor.name}
                  field={doctor.field}
                  schools={doctor.schools}
                  work={doctor.work}
                  office={doctor.office}
                />
                // <div>
                //   <p>Name: {doctor.name}</p>
                //   <p>Field: {doctor.field}</p>
                //   <p>Schools: {doctor.schools}</p>
                //   <p>Work: {doctor.work}</p>
                //   <p>Office: {doctor.office}</p>
                //   </div>
              ))}

              <button> <Link to={"/patient/home"}>
                Back to Main
                      </Link></button>
            </Jumbotron>
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
    )
  }
}

export default Doctors;
