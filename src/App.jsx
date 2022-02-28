import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
//Import Pages
import { Home, Exchange, UserCollectionBalance, Market } from "./pages";
//Router
import { Routes, Route, useLocation } from "react-router-dom";
//Animation
import { AnimatePresence } from "framer-motion";
import { GlobalStyle, Nav, Footer } from "./components";
import "./style.css";

//Context

function App() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  const location = useLocation();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);
  return (
    <div className="app">
      <GlobalStyle />
      <Nav />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route element={<Home />} path="/" />
          <Route element={<Exchange chain="polygon" />} path="/exchange" />
          <Route path="/market" element={<Market />} />

          <Route element={<UserCollectionBalance />} path="/assets" />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
