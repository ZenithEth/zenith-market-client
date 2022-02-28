import React from "react";

import { motion } from "framer-motion";
import styled from "styled-components";
import { pageAnimation } from "../animation";

import { Meta, ScrollToTop } from "../components";

import NFTBalance from "components/NFTBalance";

const UserCollectionBalance = () => {
  return (
    <StyledUserCollectionBalance
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <Meta />
      <ScrollToTop />
      <motion.div className="main">
        <h1>Your Collection</h1>
        <NFTBalance />
      </motion.div>
    </StyledUserCollectionBalance>
  );
};

const StyledUserCollectionBalance = styled(motion.div)`
  padding: 0rem 6.5rem;
  background: #0b172e;
  display: flex;
  flex-flow: column wrap;
  min-height: 81vh;
  padding-bottom: 6rem;
  .main {
    background: #0b172e;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    gap: 1rem;
    width: 100%;
    h1 {
      font-size: 1.5rem;
      text-align: center;
    }
  }
  @media (max-width: 900px) {
    padding: 0rem 1rem;
    padding-bottom: 6rem;
  }
`;

export default UserCollectionBalance;
