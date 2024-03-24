/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* The page shown when user does not have the necessary permissions to view a certain page
* */

import {Alert, Container} from "react-bootstrap";

function NoPermission() {
    return (
        <Container>
            <Alert variant={"warning"}>
                <Alert.Heading>
                    No Permission
                </Alert.Heading>
                <p>
                    You do not have permission to view this content. If you have an account with elevated privileges login using that account.
                </p>
            </Alert>
        </Container>
    );
}