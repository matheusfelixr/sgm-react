import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import { isAdmin } from '../../service/SecurityService'

import Header from '../../component/Header'


export default class dashboard extends Component {

    constructor(props) {
      super(props);
  
      this.state = { 
        isAdminB : true 
      }
    }
  
    componentDidMount() {
       var opaopa = isAdmin()
     
         this.setState({isAdminB: isAdmin()})
      }
  
    render() {
      return (
        <>
          <Header/>
          {   console.log(this.state.isAdminB == "false" )}
          {this.state.isAdminB == "false"  && <Redirect to={{ pathname: '/mailing', state: { from: "/" } }} />}
        </ >
      );
    }
  }