import React, {Component} from "react";
import LoginButton from "../../components/authentication/LoginButton";
import LogoutButton from "../../components/authentication/LogoutButton";
import Profile from "../../components/authentication/Profile";
import TokenInfo from "../../components/authentication/TokenInfo";

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
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

export default Home;