import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import { Input, TextArea, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";

function Main() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});
  const formEl = useRef(null);

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => {
        // console.log(res.data.books);
        setBooks(res.data.books);
      })
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
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
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(res => {
          formEl.current.reset();
          loadBooks();
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Container fluid>
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
