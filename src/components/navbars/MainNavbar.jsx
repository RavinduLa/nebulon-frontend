/*
* @Author = A.M.W.W.R.L. Wataketiya
* Main Navigation bar
* Includes login and logout buttons
* */

import {useAuth0} from "@auth0/auth0-react";
import {userEmailString, userAccessTokenString} from "../../constants/UserConstants";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

function MainNavbar(props) {
    const {loginWithRedirect, logout, user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();

    //Write the user's email to sessionStorage
    const setUserEmailToSessionStorage = async (email) => {
        await sessionStorage.setItem(userEmailString, email);
    }

    //Set the user's access token to the session storage
    const setAccessTokenToSessionStorage = async () => {
        const token = await getAccessTokenSilently();
        await sessionStorage.setItem(userAccessTokenString, token);
    }

    //Set user related variables into the session storage
    const setSessionStorage = async () => {
      await setUserEmailToSessionStorage(user.email);
      await setAccessTokenToSessionStorage();
    }

    //Remove the user's email from the session storage
    const removeUserEmailFromSessionStorage = () => {
        sessionStorage.removeItem(userEmailString);
    }

    //Method to remove access token from the session storage
    const removeUserAccessTokenFromSessionStorage = () => {
      sessionStorage.removeItem(userAccessTokenString);
    }

    //Clears the session storage of user related variables
    const clearSessionStorage = () => {
      removeUserEmailFromSessionStorage();
      removeUserAccessTokenFromSessionStorage();
    }

    //Method to login the user
    const loginUser = async () => {
        await loginWithRedirect();
        setSessionStorage();
    }

    //Method to logout the user
    const logoutUser = () => {
        clearSessionStorage();
        logout({logoutParams: {returnTo: window.location.origin}});
    }

    return(
        <Navbar collapseOnSelect expand="lg">
            <Container>
                <Link to={'/'} className={'navbar-brand'}><h3>Nebulon</h3></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        {
                            isAuthenticated ? (
                                <NavDropdown title={user.name}>
                                    <NavDropdown.Item>{user.email}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={ logoutUser }>Logout</NavDropdown.Item>
                                </NavDropdown>
                                )
                                :
                                (
                                    <Button onClick={loginUser} className={'nav-link btn btn-secondary m-1'}>
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