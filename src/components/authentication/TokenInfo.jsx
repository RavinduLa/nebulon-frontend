
import {useAuth0} from "@auth0/auth0-react";
import React, {useState} from "react";

const TokenInfo = () => {
  const {user, getAccessTokenSilently} = useAuth0();
  const [tokenString, setTokenString] = useState("empty");
  const [rolesArray, setRolesArray] = useState(["none"]);

  const getAccessToken = async () => {
      const token = await getAccessTokenSilently();
      setTokenString(token);
  }

  const getUserRoles = () => {
    const roles = user['https://nebulon-api.com/roles'];
    console.log("Roles : " + roles[0]);
    setRolesArray(roles);
  }

  return(
      <div>
          <button onClick={getAccessToken}>
              Get Access Token
          </button>

          <br/>
          <br/>
          <text>Token String</text>
          <br/>
          <text>
              {tokenString}
          </text>
          <br/>
          <br/>
          <text>Roles</text>
          <br/>
          <button onClick={getUserRoles}>
              Get roles
          </button>
          <br/>
          <text>
              {rolesArray[0]}
          </text>
      </div>
  );
}

export default TokenInfo;