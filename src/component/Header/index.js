import React, { Component } from 'react';

import { logOut } from '../../service/SecurityService'

import { HeaderUser, HeaderExit, HeaderNavDropdown, HeaderContainerBrand, HeaderContainerDropdown,HeaderNavBar } from './style'

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
            <HeaderNavBar bg="primary" variant="dark">

                <HeaderContainerBrand>
                    <HeaderNavBar.Brand>
                        SGM
                </HeaderNavBar.Brand>
                </HeaderContainerBrand>

                < HeaderContainerDropdown>
                    <HeaderNavDropdown title="Cadastro" id="basic-nav-dropdown">
                        <HeaderNavDropdown.Item href="#action/3.1">Pessoa</HeaderNavDropdown.Item>
                        <HeaderNavDropdown.Item href="#action/3.1">Usuário</HeaderNavDropdown.Item>
                    </HeaderNavDropdown>
                </HeaderContainerDropdown>
                < HeaderContainerDropdown>
                    <HeaderNavDropdown title="Operações" id="basic-nav-dropdown">
                        <HeaderNavDropdown.Item href="#action/3.1">Import Mailing</HeaderNavDropdown.Item>
                        <HeaderNavDropdown.Item href="#action/3.1">Export Mailin</HeaderNavDropdown.Item>
                    </HeaderNavDropdown>

                </HeaderContainerDropdown>


                <HeaderNavBar.Collapse className="justify-content-end">
                    <HeaderNavBar.Text>
                        <HeaderUser className="user"> {localStorage.getItem('user')}  </HeaderUser>
                        <HeaderExit href='/' onClick={() => this.exit()}>sair</HeaderExit>
                    </HeaderNavBar.Text>
                </HeaderNavBar.Collapse>
                {this.state.isRedirect && <Redirect to={{ pathname: '/', state: { from: "/mailing" } }} />}
            </HeaderNavBar>
        )
    }
}