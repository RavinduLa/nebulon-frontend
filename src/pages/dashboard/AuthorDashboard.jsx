import {Component} from "react";
import CheckAuth from "../../services/CheckAuth";

class AuthorDashboard extends Component{
    render() {
        return(
            <div>
                <h1>Dashboard</h1>
            </div>
        );
    }
}

export default CheckAuth(AuthorDashboard);