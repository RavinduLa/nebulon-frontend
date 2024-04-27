/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* The 404 error page
* */
import {Component} from "react";

class Error404 extends Component{
    heroStyle = {
        color : '#8C8AFF',
        fontWeight: 'bold',
        fontSize: '100px',
    }

    render() {
        return(
            <div>
                <h1 style={this.heroStyle}>404</h1>
                <h2>We could not find the page you are looking for</h2>
            </div>
        );
    }
}

export default Error404;