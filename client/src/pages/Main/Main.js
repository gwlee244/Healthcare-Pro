import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import { Input, TextArea, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

function Main() {
  // Setting our component's initial state
  const [books, setDocs] = useState([]);
  const [formObject, setFormObject] = useState({});
  const formEl = useRef(null);

  // Load all books and store them with setBooks
  useEffect(() => {
    loadDoctors();
  }, []);

  // Loads all books and sets them to books
  function loadDoctors() {
    API.getDocs()
      .then(res => {
        // console.log(res.data.books);
        setDocs(res.data.books);
      })
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteDoc(id) {
    API.deleteDoc(id)
      .then(res => loadDoctors())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveDoc({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(res => {
          formEl.current.reset();
          loadDoctors();
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Container fluid>
      <SideNav
    onSelect={(selected) => {
        // Add your code here
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        <NavItem eventKey="log">
            <NavIcon>
                <i className="fas fa-user-nurse" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Doctor
            </NavText>
        </NavItem>
        <NavItem eventKey="clinic">
            <NavIcon>
                <i className="fas fa-clinic-medical" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Clinic
            </NavText>
        </NavItem>
        <NavItem eventKey="chart">
            <NavIcon>
                <i className="fas fa-chart-bar" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Chart
            </NavText>
        </NavItem>
        <NavItem eventKey="healthlog">
            <NavIcon>
                <i className="fas fa-heartbeat" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Health Log
            </NavText>
            <NavItem eventKey="healthlog/symptoms">
                <NavText>
                Symptoms
                </NavText>
            </NavItem>
            <NavItem eventKey="healthlog/Prescriptions">
                <NavText>
                Prescriptions
                </NavText>
            </NavItem>
        </NavItem>
    </SideNav.Nav>
</SideNav>
      <Row>
      <Col size="md-9">
          <Card title="Main">
        
          <h1>Main Page</h1>
          <p>Your info
          </p>
  
          </Card>
        </Col>
        <Col size="md-3">
          <Card title="What Do you want to do?">

            <button> <Link to={"/results/"}>
              Medical Results
                      </Link></button>
                      <br></br>
            <button> <Link to={"/message/"}>
              Ask a Question
                      </Link></button>
                      <br></br>
            <button> <Link to={"/appointment/"}>
              Request An Appointment
                      </Link></button>
                      <br></br>
            <button> <Link to={"/doctors/"}>
              Doctor Info
                      </Link></button>
                      <br></br>
            <button> <Link to={"/summary/"}>
              Health Summary
                      </Link></button>
          </Card>
        </Col>
       
      </Row>
    </Container>
  );
}


export default Main;
