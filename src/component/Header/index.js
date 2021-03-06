import React, { Component } from 'react';

import Navbar from 'react-bootstrap/Navbar';

import { logOut } from '../../service/SecurityService'




export default class Header extends Component {

    constructor(props) {
        super(props);
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
                        <span className="user"> {localStorage.getItem('user')}  </span>
                        <span className="cursor-pointer" href='/' onClick={() => this.exit()}>sair</span>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}