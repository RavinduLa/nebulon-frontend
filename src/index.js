import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from "@auth0/auth0-react";
import history from "./utils/history";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
//import { getConfig } from "./config";


const onRedirectCallback = (appState) => {
    history.push(
        appState && appState.returnTo ? appState.returnTo : window.location.origin
    );
}

//const config = getConfig();

const providerConfig = {
    domain: "dev-4niilg28gc5v6yqb.us.auth0.com",
    clientId: "9emlscjzSgkyJhZWUgYkR9wLILHYCOu3",
    onRedirectCallback,
    authorizationParams: {
        redirect_uri: window.location.origin,
        audience: "https://nebulon-api.com",
        scope: "openid profile email"
    },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Auth0Provider
          /*domain="dev-4niilg28gc5v6yqb.us.auth0.com"
          clientId="9emlscjzSgkyJhZWUgYkR9wLILHYCOu3"
          authorizationParams={{
              redirect_uri: window.location.origin,
              audience: "https://nebulon-api.com",
              scope: "openid profile email"
          }}*/
          {...providerConfig}
      >
          <App />
      </Auth0Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
