import React, { Component } from 'react';
import './styles.css';
import { nextMailling } from '../../service/MaillingService'
import { history } from '../../config/History'


import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import AlertInfo from '../../component/AlertInfo';



export default class Milling extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: "",
      variant: "",
      alertShow: false,
      form : {
        id: "",
        campaignCode: "",
        campaign: "",
        customerKey: "",
        cpfCnpj: "",
        name: "",
        phone1: "",
        phone2: "",
        phone3: ""
      }

    }
  }

  componentDidMount() {
    const isLogged = !!localStorage.getItem('token')
    if (!isLogged) {
      history.push('/')
    }
    this.nextMailling()
  }

  nextMailling = () => {
    this.setState({ error: "", alertShow: false, variant: "danger" })


    nextMailling().then(response => {
      console.log(response)
      if (response.data != null) {
        this.setState({ error: "Sucesso ao buscar mailling", alertShow: true, variant: "success", form: response.data })
      } else {
        this.setState({ error: response.errors[0], alertShow: true, variant: "danger" })
      }

    }).catch((error) => {
      console.log(error);
      this.setState({ error: "Erro inesperado ao buscar novo mailling", alertShow: true, variant: "danger" })
    });

  }

  copyToClipboard = (e) => {
    navigator.clipboard.writeText(e);
  };

  render() {
    document.body.style = 'background: white;';
    return (
      <div>
        {this.state.alertShow && <AlertInfo description={this.state.error} variant={this.state.variant} alertShow={this.state.alertShow} />}
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
                <Form.Group className="mb-1" controlId="formGridId" onClick={() => this.copyToClipboard(this.stateform.id)}>
                  <Form.Label>Código</Form.Label>
                  <Form.Control type="text" disabled value={this.state.form.id}  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCampaignCode" onClick={() => this.copyToClipboard(this.state.form.campaignCode)}>
                  <Form.Label>Código da campanha</Form.Label>
                  <Form.Control type="text" disabled value={this.state.form.campaignCode} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCustomerKey" onClick={() => this.copyToClipboard(this.state.form.customerKey)}>
                  <Form.Label>Customer Key</Form.Label>
                  <Form.Control type="text" disabled value={this.state.form.customerKey} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCampaign" onClick={() => this.copyToClipboard(this.state.form.campaign)}>
                  <Form.Label>Campanha</Form.Label>
                  <Form.Control type="text" disabled value={this.state.form.campaign} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group className="mb-2" controlId="formGridCpfCnpj" onClick={() => this.copyToClipboard(this.state.form.cpfCnpj)}>
                  <Form.Label>CPF/CNPJ</Form.Label>
                  <Form.Control type="text" disabled value={this.state.form.cpfCnpj} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridName" onClick={() => this.copyToClipboard(this.state.form.name)}>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" disabled value={this.state.form.name} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPhone1" onClick={() => this.copyToClipboard(this.state.form.phone1)}>
                  <Form.Label>Telefone 1</Form.Label>
                  <Form.Control type="text" disabled value={this.state.form.phone1} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhone2" onClick={() => this.copyToClipboard(this.state.form.phone2)}>
                  <Form.Label>Telefone 2</Form.Label>
                  <Form.Control type="text" disabled value={this.state.form.phone2} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhone3" onClick={() => this.copyToClipboard(this.state.form.phone3)} >
                  <Form.Label>Telefone 3</Form.Label>
                  <Form.Control type="text" disabled value={this.state.form.phone3} />
                </Form.Group>
              </Form.Row>

            </Form>
            <Row className="justify-content-end">
              <Col xs lg="2" >
                <Button variant="success" onClick={() => this.newPassword()}>Finalizar</Button>
              </Col>
            </Row>

          </div>
        </Container>
      </div >
    );
  }
}
