/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* The page shown when user needs to log in to view a certain content
* */

import {Alert, Container} from "react-bootstrap";


function LoginNeeded() {
    const heroStyle = {
        color : '#8C8AFF',
        fontWeight: 'bold',
        fontSize: '80px',
    }
    return(
        <Container>
            <div>
                <h1 style={heroStyle}>Login needed</h1>
                <h3>This content cannot be viewed without an account. Please login in order to view this content</h3>
            </div>
            {/*<Alert variant={"warning"}>
                <Alert.Heading>
                    Please Login
                </Alert.Heading>
                <p>
                    Please login in order to view this content
                </p>
            </Alert>*/}
        </Container>
    );
}

export default LoginNeeded;