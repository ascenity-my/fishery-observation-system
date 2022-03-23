import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useHistory } from "react-router-dom";
import "styles/global.scss";
import "pattern.css/dist/pattern.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
	<BrowserRouter>
		<Auth0Provider
			domain="dev-66sjgkam.us.auth0.com"
			clientId="D20PXrSaBWsT2POmjxms7GfM9fxbESgC"
			redirectUri={window.location.origin + '/user/visualization'}
      useCookiesForTransactions={true}
      cacheLocation="localstorage"
		>
			<App />
		</Auth0Provider>
	</BrowserRouter>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
