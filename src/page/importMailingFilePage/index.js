import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import './styles.js';

import '../../global/styles.js';
import { ContainerForm } from '../../global/styles.js'

import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Header from '../../component/Header'
import AlertInfo from '../../component/AlertInfo';
import Loader from '../../component/Loader';

import { importFile } from '../../service/ImportMailingFileService'


export default class dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      file: "",
      error: "",
      variant: "",
      alertShow: false,
      isLoader: false,
    }
  }

  componentDidMount() {
    console.log(this.state.file);
  }


  importFile = () => {
    this.setState({ error: "", alertShow: false, variant: "danger", isLoader: true })

    const file = {
      file: this.state.file[0]
    }
    

    const bodyFormData = new FormData()
    bodyFormData.append('file', this.state.file[0])
    console.log(this.state.file[0])

    importFile(bodyFormData).then(response => {
      if (response.data != null) {
        this.setState({ error: "Sucesso ao importar arquivo", alertShow: true, variant: "success", isLoader: false })
      } else {
        this.setState({ error: response.errors[0], alertShow: true, variant: "danger", isLoader: false })
      }

    }).catch((error) => {
      console.log(error);
      this.setState({ error: "Erro inesperado ao importar arquivo", alertShow: true, variant: "danger", isLoader: false })
    });

  }



  render() {
    return (
      <>
        {this.state.alertShow && <AlertInfo description={this.state.error} variant={this.state.variant} alertShow={this.state.alertShow} />}
        <Loader show={this.state.isLoader} />
        <Header />
        <h2> Import de arquivos mailing</h2>
        <ContainerForm>

          <FormControl type="file" onChange={(e) => this.setState({ file: e.target.files })} />
          <Row className="justify-content-end">
            <Col xs lg="2" >
              <Button variant="success" onClick={() => this.importFile()}>Enviar</Button>
            </Col>
          </Row>
        </ContainerForm>
      </ >
    );
  }
}