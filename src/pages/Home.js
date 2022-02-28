import React from "react";

import { motion } from "framer-motion";
import styled from "styled-components";
import { pageAnimation } from "../animation";

import {
  Meta,
  ScrollToTop,
  AboutProject,
  // TrendingProjects,
} from "../components";
//Image

//Icons

const Home = () => {
  return (
    <StyledHome
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <Meta />
      <ScrollToTop />
      <motion.div>
        <AboutProject />
      </motion.div>
      {/* <motion.div>
        <TrendingProjects />
      </motion.div> */}
    </StyledHome>
  );
};

const StyledHome = styled(motion.div)`
  padding: 0rem 6.5rem;
  background: #0b172e;
  padding-bottom: 6rem;
  @media (max-width: 900px) {
    padding: 0rem 1rem;
    padding-bottom: 6rem;
  }
`;

export default Home;
