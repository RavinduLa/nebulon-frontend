/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* Wrapper for to force the user to be authenticated to view a page
* Wrap the protected component with this common component
* Wrapping will check whether the user has authenticated themselves and if the user is not authenticated will force them to log in
* */

import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";
import {CardText} from "react-bootstrap";
import LoginNeeded from "../pages/error/LoginNeeded";

const CheckAuth = (Component) => {
  const AuthRoute = () => {
      const { isLoading, isAuthenticated, user } = useAuth0();
      return ( isLoading?
              <div>
                  <CardText>Loading...</CardText>
              </div>:
              isAuthenticated ?
                  <Component userEmail = {user.email} /> :
                  <LoginNeeded />
      );

  };
  return AuthRoute;
};

export default CheckAuth;