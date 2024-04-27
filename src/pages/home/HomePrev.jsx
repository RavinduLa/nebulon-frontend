import React, {Component} from "react";
import LoginButton from "../../components/authentication/LoginButton";
import LogoutButton from "../../components/authentication/LogoutButton";
import Profile from "../../components/authentication/Profile";
import TokenInfo from "../../components/authentication/TokenInfo";
import {Link} from "react-router-dom";

class HomePrev extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <Link to={'/articles-main'}>Articles</Link>
                <br />
                <br />
                <LoginButton />
                <br/>
                <br/>
                <LogoutButton />
                <br/>
                <br/>
                <Profile />
                <br/>
                <TokenInfo />
            </div>
        );
    }
}

export default HomePrev;