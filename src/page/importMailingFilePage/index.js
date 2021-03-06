import React, { Component } from 'react';
import { Redirect } from "react-router-dom";



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