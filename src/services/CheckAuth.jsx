/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* Wrapper for to force the user to be authenticated to view a page
* Wrap the protected component with this common component
* Wrapping will check whether the user has authenticated themselves and if the user is not authenticated will force them to log in
* */

import React from "react";
import {Navigate} from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";

const CheckAuth = (Component) => {
    const { isAuthenticated } = useAuth0();
  const AuthRoute = () => {
    if(isAuthenticated) {
        return <Component />
    } else {
        return <Navigate to = "/login-needed" />
    }

  };
  return AuthRoute;
};

export default CheckAuth;