import React from 'react';
import {history} from '../config/History'
import {Router, Switch, Route} from 'react-router'
import PrivateRoute from '../config/PrivateRoute';


import Login from '../page/login/index';
import Milling from '../page/milling/index';


const Routes = () => (
    <Router history = {history}>
        <Switch>
            <PrivateRoute exact path="/milling" component={Milling}/>
            <Route exact path="/" component={Login}/>
            {/* <Route component={NotFound}/> */}
        </Switch>
    </Router>
);

export default  Routes;