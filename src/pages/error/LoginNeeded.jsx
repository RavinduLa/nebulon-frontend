/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* The page shown when user needs to login to view a certain content
* */

import {Alert, Container} from "react-bootstrap";


function LoginNeeded() {
    return(
        <Container>
            <Alert variant={"warning"}>
                <Alert.Heading>
                    Please Login
                </Alert.Heading>
                <p>
                    Please login in order to view this content
                </p>
            </Alert>
        </Container>
    );
}

export default LoginNeeded;