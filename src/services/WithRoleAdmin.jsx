/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* Wrapper for to inform the user of lack of admin permission
* Wrap the protected component with this common component
* Wrapping will check whether the user has admin permissions and will redirect accordingly
* */

import {userAccessTokenString} from "../constants/UserConstants";
import {Navigate} from "react-router-dom";
import React from "react";


const WithRoleAdmin = (Component) => {
  const roles = sessionStorage.getItem(userAccessTokenString);
  if(roles.includes("nebulon-admin")) {
      return <Component />
  } else {
      return <Navigate to = "/no-permission" />
  }
}

export default WithRoleAdmin;