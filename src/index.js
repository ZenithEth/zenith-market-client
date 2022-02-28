import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./index.css";

// import reportWebVitals from "./reportWebVitals";

import { ChakraProvider } from "@chakra-ui/react";
/** Get your free Moralis Account https://moralis.io/ */

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

// const isServerInfo = APP_ID && SERVER_URL ? true : false;

ReactDOM.render(
  <BrowserRouter>
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </MoralisProvider>
  </BrowserRouter>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
