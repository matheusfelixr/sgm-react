import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from '../page/loginPage';
import Mailing from '../page/mailingPage';
import Dashboard from '../page/dashboardPage';
import ImportMailingFilePage from '../page/importMailingFilePage';
import NotFound from '../page/notFoundPage';


export default function RoutesConfig() {
    return (
      <Router>
          <Switch>
            <PrivateRoute exact path="/mailing">
              <Mailing />
            </PrivateRoute>

            <PrivateRoute exact path="/dashboard">
              <Dashboard />
            </PrivateRoute>

            <PrivateRoute exact path="/import-mailing-file">
              <ImportMailingFilePage />
            </PrivateRoute>

            <Route exact path="/">
              <Login />
            </Route>

            <Route exact >
              <NotFound />
            </Route>
          </Switch>
      </Router>
    );
  }

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        !!localStorage.getItem('token') ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
                
              }}
            />
          )
        }
      />
    );
  }