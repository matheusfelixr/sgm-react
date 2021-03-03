import React, { Component } from 'react';
import './styles.js';
import { Redirect } from "react-router-dom";


import { LoginContainer, LoginPanel, LoginTitle, LoginContainerForm, LoginInfoError } from '../loginPage/styles'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { authenticate, resetPassword, newPassword } from '../../service/SecurityService'

import AlertInfo from '../../component/AlertInfo';
import Loader from '../../component/Loader';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: "",
      newPassword: "",
      token: "",
      error: "",
      variant: "",
      alertShow: false,
      isLogin: true,
      isResetPassword: false,
      isChangePassword: false,
      isLoader: false,
      isRedirect: false
    }
  }

  componentDidMount() {
    const isLogged = !!localStorage.getItem('token')
    if (isLogged) {
      this.setState({ isRedirect: true })
    }
  }

  authenticate = () => {
    this.setState({ error: "", alertShow: false, variant: "danger", isLoader: true })

    const authenticateJson = {
      username: this.state.user,
      password: this.state.password,
    }
    authenticate(authenticateJson).then(response => {
      if (response.data != null) {
        if (!response.data.changePassword) {
          localStorage.clear();
          localStorage.setItem('user', response.data.userName);
          localStorage.setItem('token', response.data.token);
          this.setState({ isLoader: false, isRedirect: true })
        } else {
          this.setState({ isChangePassword: true, isLogin: false, isResetPassword: false, password: "", newPassword: "", user: response.data.userName, token: response.data.token, isLoader: false })
        }

      } else {
        this.setState({ error: response.errors[0], alertShow: true, variant: "danger", isLoader: false })
      }

    }).catch((error) => {
      console.log(error);
      this.setState({ error: "Erro inesperado ao fazer login", alertShow: true, variant: "danger", isLoader: false })
    });

  }

  resetPassword = () => {
    this.setState({ error: "", alertShow: false, variant: "danger", isLoader: true })

    const resetPasswordJson = {
      username: this.state.user,
    }
    resetPassword(resetPasswordJson).then(response => {
      if (response.data != null) {
        this.setState({ error: response.data.message, alertShow: true, variant: "success", isResetPassword: false, isLogin: true, isLoader: false })
      } else {
        this.setState({ error: response.errors[0], alertShow: true, variant: "danger", isLoader: false })
      }

    }).catch((error) => {
      console.log(error);
      this.setState({ error: "Erro inesperado ao resetar senha", alertShow: true, variant: "danger", isLoader: false })
    });

  }


  newPassword = () => {
    this.setState({ error: "", alertShow: false, variant: "danger", isLoader: true })

    if (this.state.newPassword != this.state.password) {
      this.setState({ error: "As senhas devem ser iguais", alertShow: true, variant: "danger", isLoader: false })
      return;
    }

    const newPasswordJson = {
      userName: this.state.user,
      password: this.state.newPassword
    }
    newPassword(newPasswordJson, this.state.token).then(response => {
      if (response.data != null) {
        localStorage.clear();
        localStorage.setItem('user', response.data.userName);
        localStorage.setItem('token', response.data.token);
        this.setState({ isLoader: false, isRedirect: true })
      } else {
        this.setState({ error: response.errors[0], alertShow: true, variant: "danger", isLoader: false })
      }

    }).catch((error) => {
      console.log(error);
      this.setState({ error: "Erro inesperado ao resetar senha", alertShow: true, variant: "danger", isLoader: false })
    });

  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    return (
      <LoginContainer  >
        <Loader show={this.state.isLoader} />
        < LoginPanel>
          {/* tela do tipo login */}
          {this.state.isLogin &&
            <Form>

              <LoginTitle>Login</LoginTitle>

              <LoginContainerForm>
                <Form.Group controlId="formBasicUser">
                  <Form.Control required type="text" placeholder="Usuário" name="user" onChange={this.handleChange} value={this.state.user} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Senha" name="password" onChange={this.handleChange} value={this.state.password} />
                  {this.state.alertShow && <LoginInfoError>{this.state.error}</LoginInfoError>}
                </Form.Group>

                <Button className="button-login" lassName="login-button" onClick={() => this.authenticate()}>Entrar</Button>

                <span className="LoginContainerTextClick" onClick={() => this.setState({ isResetPassword: true, isLogin: false })}>Esqueci minha Senha</span>
              </LoginContainerForm>
            </Form>}
          {/* tela do tipo reset de senha */}
          {this.state.isResetPassword &&
            <Form>

              <LoginTitle>Resetar senha</LoginTitle>

              <LoginContainerForm>
                <Form.Group controlId="formBasicUser">
                  <Form.Control required type="text" placeholder="Usuário" name="user" onChange={this.handleChange} value={this.state.user} />
                  {this.state.alertShow && <LoginInfoError>{this.state.error}</LoginInfoError>}
                </Form.Group>

                <Button className="button-login" lassName="login-button" type="submit" onClick={() => this.resetPassword()}>Resetar senha</Button>

                <span className="LoginContainerTextClick" onClick={() => this.setState({ isResetPassword: false, isLogin: true })}>Retornar ao login</span>
              </LoginContainerForm>
            </Form>}

          {/* tela de nova senha*/}
          {this.state.isChangePassword &&
            <Form>

              <LoginTitle>Criar nova senha</LoginTitle>

              <LoginContainerForm>
                <Form.Group controlId="formBasicUser">
                  <Form.Control required type="password" placeholder="Nova senha" name="password" onChange={this.handleChange} value={this.state.password} />
                </Form.Group>
                <Form.Group controlId="formBasicUser">
                  <Form.Control required type="password" placeholder="Repetir nova senha" name="newPassword" onChange={this.handleChange} value={this.state.newPassword} />
                  {this.state.alertShow && <LoginInfoError>{this.state.error}</LoginInfoError>}

                </Form.Group>

                <Button className="button-login" className="login-button" type="submit" onClick={() => this.newPassword()}>Salvar</Button>

                <span className="LoginContainerTextClick" onClick={() => this.setState({ isResetPassword: false, isLogin: true, isChangePassword: false })}>Retornar ao login</span>
              </LoginContainerForm>
            </Form>
          }
        </LoginPanel>
        {this.state.isRedirect && <Redirect to={{ pathname: '/mailing', state: { from: "/" } }} />}
      </LoginContainer>
    );
  }
}
