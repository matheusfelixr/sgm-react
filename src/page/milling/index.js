import React, { Component } from 'react';
import './styles.css';
import { nextMilling, saveAttendance } from '../../service/MillingService'
import { getReansonMilling, getStatusByReasonMilling } from '../../service/StatusMaillingService'
import { maskCpfOrCnpj, maskPhone} from '../../Uteis/Mask'

import { history } from '../../config/History'

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import AlertInfo from '../../component/AlertInfo';
import Loader from '../../component/Loader';
import Modal from 'react-bootstrap/Modal'

export default class Milling extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: "",
      variant: "",
      alertShow: false,
      form: {
        id: "",
        campaignCode: "",
        campaign: "",
        customerKey: "",
        cpfCnpj: "",
        name: "",
        phone1: "",
        phone2: "",
        phone3: ""
      },
      isLoader: false,
      isAttending: false,
      isShowModal: false,
      reansonMillings: [],
      statusMillings: [],
      statusMilling: ""

    }
  }

  componentDidMount() {
    const isLogged = !!localStorage.getItem('token')
    if (!isLogged) {
      history.push('/')
    }
  }

  nextMilling = () => {
    this.setState({ error: "", alertShow: false, variant: "danger", isLoader: true, isAttending: true })

    nextMilling().then(response => {
      if (response.data != null) {
        this.setState({ error: "Sucesso ao buscar mailling", alertShow: true, variant: "success", form: response.data, isLoader: false })
      } else {
        this.setState({ error: response.errors[0], alertShow: true, variant: "danger", isLoader: false })
      }

    }).catch((error) => {
      console.log(error);
      this.setState({ error: "Erro inesperado ao buscar novo mailling", alertShow: true, variant: "danger", isLoader: false })
    });

  }

  getReansonMilling = () => {
    this.setState({ error: "", alertShow: false, variant: "danger", isLoader: true, isAttending: true })

    getReansonMilling().then(response => {
      if (response.data != null) {

        this.setState({ reansonMillings: response.data, isLoader: false })
      } else {
        this.setState({ error: response.errors[0], alertShow: true, variant: "danger", isLoader: false })
      }

    }).catch((error) => {
      console.log(error);
      this.setState({ error: "Erro inesperado ao buscar status", alertShow: true, variant: "danger", isLoader: false })
    });

  }


  getStatusByReasonMilling = (reansonMilling) => {
    this.setState({ error: "", alertShow: false, variant: "danger", isLoader: true, isAttending: true })

    getStatusByReasonMilling(reansonMilling).then(response => {
      if (response.data != null) {
        this.setState({ statusMillings: response.data, isLoader: false })
      } else {
        this.setState({ error: response.errors[0], alertShow: true, variant: "danger", isLoader: false })
      }

    }).catch((error) => {
      console.log(error);
      this.setState({ error: "Erro inesperado ao buscar status", alertShow: true, variant: "danger", isLoader: false })
    });

  }

  saveAttendance = () => {
    this.setState({ error: "", alertShow: false, variant: "danger", isLoader: true, isAttending: true })

    const saveAttendanceJson = {
      idMailling: this.state.form.id,
      idMaillingStatus: this.state.statusMilling,
    }

    saveAttendance(saveAttendanceJson).then(response => {
      console.log(response)
      if (response.data != null) {
        this.setState({
          error: response.message,
          alertShow: true, variant: "sucess",
          isLoader: false,
          isAttending: false,
          isShowModal: false,
          reansonMillings: [],
          statusMillings: [],
          statusMilling: ""
        })
      } else {
        this.setState({ error: response.errors[0], alertShow: true, variant: "danger", isLoader: false })
      }

    }).catch((error) => {
      console.log(error);
      this.setState({ error: "Erro inesperado ao salvar atendimento", alertShow: true, variant: "danger", isLoader: false })
    });
  };


  maskCpfOrCnpj = (cpfOrCnpj) => {
    return maskCpfOrCnpj(cpfOrCnpj)
  };

  maskPhone = (phone) => {
    return maskPhone(phone)
  };

  endService = () => {
    this.setState({ isShowModal: true })
    this.getReansonMilling()
  };

  exit = () => {
    localStorage.clear();
    history.push('/');
  };

  copyToClipboard = (e) => {
    navigator.clipboard.writeText(e);
  };

  selectedReasonHandleChange = event => {
    this.getStatusByReasonMilling(event.target.value)
  }

  selectedStatusHandleChange = event => {
    this.setState({ statusMilling: event.target.value })
  }


  render() {
    document.body.style = 'background: white;';
    return (
      <div>
        <Loader show={this.state.isLoader} />
        {this.state.alertShow && <AlertInfo description={this.state.error} variant={this.state.variant} alertShow={this.state.alertShow} />}
        {/* Header */}
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand>Milling</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <span className="user"> {localStorage.getItem('user')}  </span>
              <span className="cursor-pointer" onClick={() => this.exit()}>sair</span>

            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>

        <Container className="container" >
          <div className="container-info">
            {/* Verifica se quer fazer um atendimento */}
            {!this.state.isAttending &&
              <div>
                <Button variant="warning" onClick={() => this.nextMilling()}>Iniciar Atendimento</Button>

              </div>
            }
            {/* Atendimento */}
            {this.state.isAttending &&
              <div>
                <Form>
                  <Form.Row>
                    <Form.Group className="mb-1" controlId="formGridId" onClick={() => this.copyToClipboard(this.stateform.id)}>
                      <Form.Label>Código</Form.Label>
                      <Form.Control type="text" disabled value={this.state.form.id} />
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
                    <Form.Group className="mb-2" controlId="formGridCpfCnpj" onClick={() => this.copyToClipboard(this.maskCpfOrCnpj(this.state.form.cpfCnpj))}>
                      <Form.Label>CPF/CNPJ</Form.Label>
                      <Form.Control type="text" disabled value={this.maskCpfOrCnpj(this.state.form.cpfCnpj)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridName" onClick={() => this.copyToClipboard(this.state.form.name)}>
                      <Form.Label>Nome</Form.Label>
                      <Form.Control type="text" disabled value={this.state.form.name} />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridPhone1" onClick={() => this.copyToClipboard(this.maskPhone(this.state.form.phone1))}>
                      <Form.Label>Telefone 1</Form.Label>
                      <Form.Control type="text" disabled value={this.maskPhone(this.state.form.phone1)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPhone2" onClick={() => this.copyToClipboard(this.maskPhone(this.state.form.phone2))}>
                      <Form.Label>Telefone 2</Form.Label>
                      <Form.Control type="text" disabled value={this.maskPhone(this.state.form.phone2)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPhone3" onClick={() => this.copyToClipboard(this.maskPhone(this.state.form.phone3))} >
                      <Form.Label>Telefone 3</Form.Label>
                      <Form.Control type="text" disabled value={this.maskPhone(this.state.form.phone3)} />
                    </Form.Group>
                  </Form.Row>

                </Form>
                <Row className="justify-content-end">
                  <Col xs lg="2" >
                    <Button variant="success" onClick={() => this.endService()}>Finalizar</Button>
                  </Col>
                </Row>
              </div>}
          </div>


          <Modal show={this.state.isShowModal} onHide={() => this.setState({ isShowModal: false })} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Finalizar Atendimento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="selectReansonMailling">
                  <Form.Label>Motivo</Form.Label>
                  <Form.Control as="select" size="md" onChange={this.selectedReasonHandleChange}>
                    <option value="" disabled selected>Selecione</option>
                    {
                      this.state.reansonMillings.map((e, index) => {

                        return <option key={index} value={e.reasonMailling}>{e.reasonMailling}</option>
                      })
                    }
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="selectStatus">
                  <Form.Label>Sub Motivo</Form.Label>
                  <Form.Control as="select" size="md" onChange={this.selectedStatusHandleChange}>
                    <option value="" disabled selected>Selecione</option>
                    {
                      this.state.statusMillings.map((e, index) => {

                        return <option key={index} value={e.id}>{e.description}</option>
                      })
                    }
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="success" onClick={() => this.saveAttendance()}>Finalizar</Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div >
    );
  }
}
