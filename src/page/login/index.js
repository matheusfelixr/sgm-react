import React, { Component } from 'react';
import './styles.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {history} from '../../config/History'
import { authenticate } from '../../service/SecurityService'


export default class Login extends Component {
  constructor(props){
    super(props);
  
    this.state={
      user:"",
      password:"",
      error:""
    }
  }

  componentDidMount() {
    const isLogged = !! localStorage.getItem('user')
    if(isLogged){
      history.push('/miling')
    }
  
  }

  authenticate = () =>{
    
    const authenticateJson = {
      username:this.state.user,
        password:this.state.password,
    }
    authenticate(authenticateJson).then(response => {
      if(response.data !=null){
        console.log(response);
        localStorage.clear();
        localStorage.setItem('user',JSON.stringify(response.data))
        history.push('/miling')        
      }else{
        console.log(response.errors[0]);
        this.setState({error: response.errors[0]})
      }
     
    }).catch((error) => {
       console.log(error)
    });

  }
  
  
  handleChange = event =>{
    this.setState({[event.target.name] : event.target.value})
  }
    render() {
      document.body.style = 'background: #46a0f5;';
      return (
             <div className="login">
                 <Alert  variant="danger">
                    {this.state.error}
                  </Alert>
               <div className="container-login">
               <Form>
                  <Form.Group controlId="formBasicUser">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control required type="text" placeholder="Usuário" name="user" onChange={this.handleChange} value={this.state.user}/>
                  </Form.Group>
  
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Senha" name="password" onChange={this.handleChange} value={this.state.password}/>
                  </Form.Group>
                  <div className="container-buton">
                    <Button variant="primary" onClick={() => this.authenticate() }>Entrar</Button>
                  </div>
                </Form>
  
               </div>
  
             </div>
      );
    }
  }
  