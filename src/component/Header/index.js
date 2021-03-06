import React, { Component } from 'react';

import { logOut } from '../../service/SecurityService'

import Navbar from 'react-bootstrap/Navbar';

import {HeaderUser, HeaderExit} from './style'

import { Redirect } from "react-router-dom";


export default class Header extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          isRedirect: false    
        }
      }

    exit = () => {
        logOut();
        this.setState({ isRedirect: true })
    };

    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <HeaderUser className="user"> {localStorage.getItem('user')}  </HeaderUser>
                        <HeaderExit href='/' onClick={() => this.exit()}>sair</HeaderExit>
                    </Navbar.Text>
                </Navbar.Collapse>
                {this.state.isRedirect && <Redirect to={{ pathname: '/', state: { from: "/mailing" } }} />}
            </Navbar>
        )
    }
}