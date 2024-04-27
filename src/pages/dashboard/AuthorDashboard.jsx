import {Component} from "react";
import CheckAuth from "../../services/CheckAuth";
import {Link} from "react-router-dom";

class AuthorDashboard extends Component{
    render() {
        return(
            <div>
                <h1>Dashboard</h1>
                <div>
                    <p>Welcome to your dashboard! This iw where you can access and manage all your articles.</p>
                </div>
                <br />
                <br />
                <Link to={'/view-articles-author'}>View your articles</Link>
            </div>
        );
    }
}

export default CheckAuth(AuthorDashboard);