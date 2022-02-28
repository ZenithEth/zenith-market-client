import React from "react";
// import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

// import Button from "./Button";

import { aboutProjectAnimation } from "../animation";
const TrendingProjects = () => {
  return (
    <StyledTrendingProjects
      variants={aboutProjectAnimation}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.3 }}
    >
      <motion.h2>Trending Projects</motion.h2>
      <motion.div className="slideshow"></motion.div>
    </StyledTrendingProjects>
  );
};

const StyledTrendingProjects = styled(motion.div)`
  display: flex;
  flex-flow: column wrap;
  padding: 2rem 0rem;
  overflow: hidden;
  gap: 6rem;
  h2 {
    font-family: "Amiri", serif;
    color: white;
    font-weight: bold;
    font-size: 1.6rem;
  }
`;

export default TrendingProjects;
