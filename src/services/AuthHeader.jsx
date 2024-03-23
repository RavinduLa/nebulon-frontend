/*
* @Author = A.M.W.W.R.L. Wataketiya
* The AuthHeader can be used to easily integrate the bearer token into API requests
* */

import {userAccessTokenString} from "../constants/UserConstants";

export default function AuthHeader() {
    const token = JSON.parse(sessionStorage.getItem(userAccessTokenString));

    if(token) {
        return { Authorization: 'Bearer ' + token};
    } else  {
        return {};
    }
}