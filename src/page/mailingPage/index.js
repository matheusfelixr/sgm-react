import React, { Component } from 'react';
import './styles.js';
import { MailingBtnAtendance } from './styles'

import '../../global/styles.js';
import { ContainerForm } from '../../global/styles.js'

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal'

import AlertInfo from '../../component/AlertInfo';
import Loader from '../../component/Loader';
import Header from '../../component/Header'


import { nextMailing, saveAttendance } from '../../service/MailingService'
import { getReansonMailing, getStatusByReasonMailing } from '../../service/StatusMailingService'
import { maskCpfOrCnpj, maskPhone } from '../../uteis/Mask'

export default class Mailing extends Component {

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
      reansonMailings: [],
      statusMailings: [],
      statusMailing: "",
      isRedirect: false

    }
  }

  componentDidMount() {
    const isLogged = !!localStorage.getItem('token')
    if (!isLogged) {
      this.setState({ isRedirect: true })
    }
  }

  nextMailing = () => {
    this.setState({ error: "", alertShow: false, variant: "danger", isLoader: true })

    nextMailing().then(response => {
      if (response.data != null) {
        this.setState({ error: "Sucesso ao buscar mailing", alertShow: true, variant: "success", form: response.data, isLoader: false, isAttending: true })
      } else {
        this.setState({ error: response.errors[0], alertShow: true, variant: "danger", isLoader: false })
      }

    }).catch((error) => {
      console.log(error);
      this.setState({ error: "Erro inesperado ao buscar novo mailing", alertShow: true, variant: "danger", isLoader: false })
    });

  }

  getReansonMailing = () => {
    this.setState({ error: "", alertShow: false, variant: "danger", isLoader: true, isAttending: true })

    getReansonMailing().then(response => {
      if (response.data != null) {

        this.setState({ reansonMailings: response.data, isLoader: false })
      } else {
        this.setState({ error: response.errors[0], alertShow: true, variant: "danger", isLoader: false })
      }

    }).catch((error) => {
      console.log(error);
      this.setState({ error: "Erro inesperado ao buscar status", alertShow: true, variant: "danger", isLoader: false })
    });

  }


  getStatusByReasonMailing = (reansonMailing) => {
    this.setState({ error: "", alertShow: false, variant: "danger", isLoader: true, isAttending: true })

    getStatusByReasonMailing(reansonMailing).then(response => {
      if (response.data != null) {
        this.setState({ statusMailings: response.data, isLoader: false })
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
      idMailing: this.state.form.id,
      idMailingStatus: this.state.statusMailing,
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
          reansonMailings: [],
          statusMailings: [],
          statusMailing: ""
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
    this.getReansonMailing()
  };

  copyToClipboard = (e) => {
    navigator.clipboard.writeText(e);
  };

  selectedReasonHandleChange = event => {
    this.getStatusByReasonMailing(event.target.value)
  }

  selectedStatusHandleChange = event => {
    this.setState({ statusMailing: event.target.value })
  }


  render() {
    return (
      <div>
        {this.state.alertShow && <AlertInfo description={this.state.error} variant={this.state.variant} alertShow={this.state.alertShow} />}
        <Loader show={this.state.isLoader} />
        <Header />
        <ContainerForm>

          {/* Verifica se quer fazer um atendimento */}
          {!this.state.isAttending &&
            <MailingBtnAtendance variant="secondary " onClick={() => this.nextMailing()}>Iniciar Atendimento </MailingBtnAtendance>
          }
          {/* Atendimento */}
          {this.state.isAttending &&
            <div>
              <Form>
                <Form.Row>
                  <Form.Group className="mb-1" controlId="formGridId" onClick={() => this.copyToClipboard(this.state.form.id)}>
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
                  <Form.Group className="mb-2 " controlId="formGridCpfCnpj" onClick={() => this.copyToClipboard(this.maskCpfOrCnpj(this.state.form.cpfCnpj))}>
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
              </div>
           }

          <Modal show={this.state.isShowModal} onHide={() => this.setState({ isShowModal: false })} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Finalizar Atendimento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="selectReansonMailing">
                  <Form.Label>Motivo</Form.Label>
                  <Form.Control as="select" size="md" onChange={this.selectedReasonHandleChange}>
                    <option value="" disabled selected>Selecione</option>
                    {
                      this.state.reansonMailings.map((e, index) => {

                        return <option key={index} value={e.reasonMailing}>{e.reasonMailing}</option>
                      })
                    }
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="selectStatus">
                  <Form.Label>Sub Motivo</Form.Label>
                  <Form.Control as="select" size="md" onChange={this.selectedStatusHandleChange}>
                    <option value="" disabled selected>Selecione</option>
                    {
                      this.state.statusMailings.map((e, index) => {

                        return <option key={index} value={e.id}>{e.description}</option>
                      })
                    }
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="success" disabled={this.state.statusMailing == ""} onClick={() => this.saveAttendance()}>Finalizar</Button>
            </Modal.Footer>
          </Modal>
        </ContainerForm>
      </div >
    );
  }
}
