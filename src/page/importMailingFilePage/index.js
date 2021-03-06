import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import './styles.js';

// import {MailingContainer, MailingContainerInfo, MailingBtnAtendance} from './styles'


import Header from '../../component/Header'


export default class dashboard extends Component {

    constructor(props) {
      super(props);
  
      this.state = { 
    
      }
    }
  
    componentDidMount() {

      }
  
    render() {
      return (
        <>
          <Header/>
         <div>Import</div>
        </ >
      );
    }
  }