/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* Main Navigation bar
* Includes login and logout buttons
* */

import {useAuth0} from "@auth0/auth0-react";
import {userEmailString, userAccessTokenString, userLoginStatusString} from "../../constants/UserConstants";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";

function MainNavbar(props) {
    const {loginWithRedirect, logout, user, isAuthenticated, isLoading, getAccessTokenSilently, handleRedirectCallback} = useAuth0();

    //Write the user's email to sessionStorage
    const setUserEmailToSessionStorage = async (email) => {
        await window.sessionStorage.setItem(userEmailString, email);
    }

    //Set the user's access token to the session storage
    const setAccessTokenToSessionStorage = async (token) => {
        //const token = await getAccessTokenSilently();
        await window.sessionStorage.setItem(userAccessTokenString, token);
    }

    const setLoginStatusToSessionStorage = async (status) => {
      await window.sessionStorage.setItem(userLoginStatusString, status);
    }

    //Set user related variables into the session storage
    /* const setSessionStorage = async () => {
        console.log('Setting session storage.');
      await setUserEmailToSessionStorage(user.email);
      await setAccessTokenToSessionStorage();
      await setLoginStatusToSessionStorage(true);

      console.log('Session storage set.');
    } */

    //Remove the user's email from the session storage
    const removeUserEmailFromSessionStorage = () => {
        window.sessionStorage.removeItem(userEmailString);
    }

    //Method to remove access token from the session storage
    const removeUserAccessTokenFromSessionStorage = () => {
        window.sessionStorage.removeItem(userAccessTokenString);
    }

    const removeUserLoginStatusFromSessionStorage = () => {
        window.sessionStorage.removeItem(userLoginStatusString);
    }

    //Clears the session storage of user related variables
    const clearSessionStorage = () => {
        console.log('Clearing session storage.');
      removeUserEmailFromSessionStorage();
      removeUserAccessTokenFromSessionStorage();
      console.log("Session storage cleared.");
      //removeUserLoginStatusFromSessionStorage();
    }

    //Method to login the user
    /*const loginUser = async () => {
        await loginWithRedirect();
        await setSessionStorage();
    } */

    //Method to logout the user
    const logoutUser = async () => {
        clearSessionStorage();
        await logout({logoutParams: {returnTo: window.location.origin}});
        await setLoginStatusToSessionStorage(false);
    }

    const requestLogout = async () => {
        confirmAlert({
            title: "Logout",
            message: "Do you want to logout?",
            buttons: [
                {
                    label:"Logout",
                    onClick: logoutUser
                },
                {
                    label: "Cancel",

                }
            ]
        });
    }

    const navigateToAuthorDashbaord = () => {
        window.location = `/author-dashboard`;
    }

    const navbarBrandStyle = {
        color : '#8C8AFF',
        fontWeight: 'bold',
    }

    const emailDropDownStyle = {
        color : '#8C8AFF',
        fontSize: '13px',
    }

    return(
        <Navbar collapseOnSelect expand="lg">
            <Container>
                <Link to={'/'} style={navbarBrandStyle} className={'navbar-brand'}><h3>Nebulon</h3></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        {
                            isAuthenticated ? (
                                <NavDropdown title={user.name}>
                                    <NavDropdown.Item onClick={navigateToAuthorDashbaord}>Dashboard</NavDropdown.Item>
                                    {/*<NavDropdown.Item style={emailDropDownStyle}>{user.email}</NavDropdown.Item>*/}

                                    <NavDropdown.Item onClick={ requestLogout }>Logout</NavDropdown.Item>
                                </NavDropdown>
                                )
                                :
                                (
                                    <Button onClick={
                                        () => {
                                            loginWithRedirect().then(() => {
                                                handleRedirectCallback().then(() => {
                                                    console.log("Auth0 isLoading value : ", isLoading);
                                                    setUserEmailToSessionStorage(user.email).then(() => {
                                                        getAccessTokenSilently().then((token) => {
                                                            setAccessTokenToSessionStorage(token).then(() => {
                                                                setLoginStatusToSessionStorage(true).then(r => {
                                                                    console.log('Set login status to session storage...')
                                                                });
                                                            });
                                                        });
                                                    });
                                                });

                                            });
                                            /*await setUserEmailToSessionStorage(user.email);
                                            let token = await getAccessTokenSilently();
                                            await setAccessTokenToSessionStorage(token);
                                            await setLoginStatusToSessionStorage(true);*/
                                        }
                                    } className={'nav-link btn btn-secondary m-1'}>
                                        Login
                                    </Button>
                                )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MainNavbar;