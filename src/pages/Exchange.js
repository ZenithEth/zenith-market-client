import React from "react";

import { motion } from "framer-motion";
import styled from "styled-components";
import { pageAnimation } from "../animation";
import DEX from "components/DEX";
import { Meta, ScrollToTop } from "../components";
//Image

//Icons

const Exchange = () => {
  return (
    <StyledExchange
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <Meta />
      <ScrollToTop />
      <motion.div className="main">
        <h1>Swap Tokens</h1>
        <DEX chain="polygon" />
      </motion.div>
    </StyledExchange>
  );
};

const StyledExchange = styled(motion.div)`
  padding: 0rem 6.5rem;
  background: #0b172e;
  display: flex;
  justify-content: center;
  display: flex;
  flex-flow: column wrap;
  padding-bottom: 6rem;
  .main {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    gap: 1rem;
    width: 100%;

    background: #0b172e;
    h1 {
      font-size: 1.5rem;
      text-align: center;
    }
  }
  @media (max-width: 900px) {
    padding: 0rem 1rem;
    padding-bottom: 6rem;
  }

  background: #0b172e;
`;

export default Exchange;
