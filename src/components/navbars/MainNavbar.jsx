import {useAuth0} from "@auth0/auth0-react";
import userEmailString from "../../constants/UserConstants";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

function MainNavbar(props) {
    const {loginWithRedirect, logout, user, isAuthenticated, isLoading} = useAuth0();

    //Write the user's email to sessionStorage
    const setUserEmailToSessionStorage = async (email) => {
        await sessionStorage.setItem(userEmailString, email);
    }

    //Remove the user's email from the session storage
    const removeUserEmailFromSessionStorage = () => {
        sessionStorage.removeItem(userEmailString);
    }

    //Method to login the user
    const loginUser = async () => {
        await loginWithRedirect();
        setUserEmailToSessionStorage(user.email);
    }

    //Method to logout the user
    const logoutUser = () => {
        removeUserEmailFromSessionStorage();
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