/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* The home page
* */

import {Component} from "react";
import {Link} from "react-router-dom";

class Home extends Component{
    heroStyle = {
        color : '#8C8AFF',
        fontWeight: 'bold',
        fontSize: '100px',
    }

    viewArticlesLinkStyle = {
        color : '#8C8AFF',
    }

    render() {
        return(
            <div>
                <div style={this.heroStyle}>
                    <p>Nebulon</p>
                </div>
                <div>
                    <h3>Where stars are born</h3>
                </div>
                <br/>
                <br/>
                <div className={'container'}>
                    <p>
                        Welcome to Nebulon, where modernity meets simplicity in content management.
                        Our platform redefines the way authors and readers connect, offering a sleek interface
                        and powerful tools to streamline the process. With Nebulon, content creators can effortlessly share
                        their work, while readers enjoy lightning-fast access to the latest articles, blogs, and more.
                        Say goodbye to complexity and hello to efficiency – join Nebulon today and experience
                        the future of content management, where speed and connectivity are paramount.
                    </p>

                    <br />
                    <br />

                    <h4>Get started by viewing the article. Click the below link.</h4>

                    <Link style={this.viewArticlesLinkStyle} to={'/view-articles'}>View articles</Link>

                </div>
            </div>
        );
    }
}

export default Home;