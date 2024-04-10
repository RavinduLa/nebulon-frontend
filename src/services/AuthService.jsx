/*
* @Author - Ravindu Wataketiya
* @Description - Service for handling auth processes
* */

import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import {userAccessTokenString, userEmailString, userLoginStatusString} from "../constants/UserConstants";

function AuthService(props) {
    const {loginWithRedirect, logout, user, isAuthenticatedAuth0, isLoading, getAccessTokenSilently} = useAuth0();

    const isAuthenticated = () => {
        return isAuthenticatedAuth0;
    }

    //Write the user's email to sessionStorage
    const setUserEmailToSessionStorage = async (email) => {
        await sessionStorage.setItem(userEmailString, email);
    }

    //Set the user's access token to the session storage
    const setAccessTokenToSessionStorage = async () => {
        const token = await getAccessTokenSilently();
        await sessionStorage.setItem(userAccessTokenString, token);
    }

    const setLoginStatusToSessionStorage = async (status) => {
        await sessionStorage.setItem(userLoginStatusString, status);
    }

    //Set user related variables into the session storage
    const setSessionStorage = async () => {
        await setUserEmailToSessionStorage(user.email);
        await setAccessTokenToSessionStorage();
        await setLoginStatusToSessionStorage(true);
    }

    //Remove the user's email from the session storage
    const removeUserEmailFromSessionStorage = () => {
        sessionStorage.removeItem(userEmailString);
    }

    //Method to remove access token from the session storage
    const removeUserAccessTokenFromSessionStorage = () => {
        sessionStorage.removeItem(userAccessTokenString);
    }

    /*const removeUserLoginStatusFromSessionStorage = () => {
        sessionStorage.removeItem(userLoginStatusString);
    } */

    //Clears the session storage of user related variables
    const clearSessionStorage = () => {
        removeUserEmailFromSessionStorage();
        removeUserAccessTokenFromSessionStorage();
        //removeUserLoginStatusFromSessionStorage();
    }

    //Method to login the user
    const loginUser = async () => {
        await loginWithRedirect();
        setSessionStorage();
    }

    //Method to logout the user
    const logoutUser = async () => {
        clearSessionStorage();
        await logout({logoutParams: {returnTo: window.location.origin}});
        await setLoginStatusToSessionStorage(false);
    }
}

export default AuthService;