import React from 'react';
import {history} from '../config/History'
import {Router, Switch, Route} from 'react-router'
import PrivateRoute from '../config/PrivateRoute';


import Login from '../page/login/index';
import Miling from '../page/miling/index';
import NotFound from '../page/not-found';



const Routes = () => (
    <Router history = {history}>
        <Switch>
            <PrivateRoute exact path="/miling" component={Miling}/>
            <Route exact path="/" component={Login}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
);

export default  Routes;