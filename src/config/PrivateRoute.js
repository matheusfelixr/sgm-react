import React from 'react';
import {Route, Redirect} from 'react-router'

const PrivateRoute = props => {
    const isLogged = !! localStorage.getItem('user')
    return isLogged ? <Route {...props} /> : <Redirect to="/"/>
}

export default PrivateRoute