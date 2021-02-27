import React, { Component } from 'react';
import './styles.css';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


export default class Milling extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    document.body.style = 'background: white;';
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand>Milling</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a> {localStorage.getItem('user')}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Container className="container" >
          <div className="container-info">
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control type="text" placeholder="Enter email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control type="text" placeholder="Password" />
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}
