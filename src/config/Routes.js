import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from '../page/loginPage';
import Milling from '../page/millingPage';
import NotFound from '../page/notFoundPage';


export default function RoutesConfig() {
    return (
      <Router>
          <Switch>
            <PrivateRoute exact path="/milling">
              <Milling />
            </PrivateRoute>
            <Route exact path="/">
              <Login />
              {console.log("oapoap")}
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