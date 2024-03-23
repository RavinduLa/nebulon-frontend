
import {useAuth0} from "@auth0/auth0-react";
import React, {useState} from "react";

const TokenInfo = () => {
  const {user, getAccessTokenSilently} = useAuth0();
  const [tokenString, setTokenString] = useState("empty");

  const getAccessToken = async () => {
      const token = await getAccessTokenSilently();
      setTokenString(token);
  }

  return(
      <div>
          <button onClick={getAccessToken}>
              Get Access Token
          </button>

          <br/>
          <br/>

          <text>
              {tokenString}
          </text>
      </div>
  );
}

export default TokenInfo;