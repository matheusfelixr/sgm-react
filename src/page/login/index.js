import React, { Component } from 'react';
import './styles.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { history } from '../../config/History'
import { authenticate, resetPassword } from '../../service/SecurityService'
import AlertInfo from '../../component/AlertInfo';


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: "",
      error: "",
      alertShow: false,
      variant: "",
      isResetPassword: false,
    }
  }

  componentDidMount() {
    const isLogged = !!localStorage.getItem('user')
    if (isLogged) {
      history.push('/miling')
    }

  }

  authenticate = () => {
    this.setState({ error: "", alertShow: false, variant: "danger" })

    const authenticateJson = {
      username: this.state.user,
      password: this.state.password,
    }
    authenticate(authenticateJson).then(response => {
      if (response.data != null) {
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(response.data))
        history.push('/miling')
      } else {
        this.setState({ error: response.errors[0], alertShow: true, variant: "danger" })
      }

    }).catch((error) => {
      console.log(error);
      this.setState({ error: "Erro inesperado ao fazer login", alertShow: true, variant: "danger" })
    });

  }

  resetPassword = () => {
    this.setState({ error: "", alertShow: false, variant: "danger" })

    const resetPasswordJson = {
      username: this.state.user,
    }
    resetPassword(resetPasswordJson).then(response => {
      if (response.data != null) {
        this.setState({ error: response.data.message, alertShow: true, variant: "success" , isResetPassword: false })
      } else {
        this.setState({ error: response.errors[0], alertShow: true, variant: "danger" })
      }

    }).catch((error) => {
      console.log(error);
      this.setState({ error: "Erro inesperado ao resetar senha", alertShow: true, variant: "danger" })
    });

  }


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    document.body.style = 'background: #46a0f5;';
    return (
      <div>
        <div className="login">
          {this.state.alertShow && <AlertInfo description={this.state.error} variant={this.state.variant} alertShow={this.state.alertShow} />}
         {/* tela do tipo login */}
          {!this.state.isResetPassword &&
            <div className="container-login">
              <Form>
                <h2>Login</h2>
                <Form.Group controlId="formBasicUser">
                  <Form.Label>Usuário</Form.Label>
                  <Form.Control required type="text" placeholder="Usuário" name="user" onChange={this.handleChange} value={this.state.user} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" placeholder="Senha" name="password" onChange={this.handleChange} value={this.state.password} />
                </Form.Group>
                <div className="container-buton">
                  <Button variant="primary" onClick={() => this.authenticate()}>Entrar</Button>
                </div>
                <div className="container-buton container-buton-redirect">
                  <a onClick={() => this.setState({ isResetPassword: true })}>Esqueci minha Senha</a>
                </div>
              </Form>
            </div>}
         {/* tela do tipo reset de senha */}
          {this.state.isResetPassword &&
            <div className="container-login">
              <Form>
                <h2>Reset de senha</h2>
                <Form.Group controlId="formBasicUser">
                  <Form.Label>Usuário</Form.Label>
                  <Form.Control required type="text" placeholder="Usuário" name="user" onChange={this.handleChange} value={this.state.user} />
                </Form.Group>
                <div className="container-buton">
                  <Button variant="primary" onClick={() => this.resetPassword()}>Resetar senha</Button>
                </div>
              </Form>
            </div>}
        </div>
      </div>
    );
  }
}
