import styled from 'styled-components'

import NavDropdown from 'react-bootstrap/NavDropdown';
import NavBar from 'react-bootstrap/NavBar';


export const HeaderUser = styled.span`
    font-size: 20px;
    margin-right: 20px;
    color: black;
    
`

export const HeaderExit = styled.span`
    cursor: pointer;
`
export const HeaderContainerBrand = styled.div`
  color: black !important;
    margin-left: 20px;
`
export const HeaderContainerDropdown = styled.div`
    margin-left: 20px;
    display: flex;
`

export const HeaderNavDropdown = styled(NavDropdown)`
    .dropdown-toggle {
      color: #777777;
    }
    .nav-link {
    display: block;
    padding: 0.5rem 25px;
  }

`
export const HeaderNavBar = styled(NavBar)`
     padding: 0px 35px;
    background-color: #e7e7e7 !important;

`