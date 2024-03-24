/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* Wrapper for to inform the user of lack of moderator permission
* Wrap the protected component with this common component
* Wrapping will check whether the user has moderator permissions and will redirect accordingly
* */

import {userAccessTokenString} from "../constants/UserConstants";
import {Navigate} from "react-router-dom";
import React from "react";


const WithRoleModerator = (Component) => {
    const roles = sessionStorage.getItem(userAccessTokenString);
    if(roles.includes("nebulon-moderator")) {
        return <Component />
    } else {
        return <Navigate to = "/no-permission" />
    }
}

export default WithRoleModerator;