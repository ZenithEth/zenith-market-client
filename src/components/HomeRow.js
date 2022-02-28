import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const HomeRow = (props) => {
  return <StyledHomeRow>{props.children}</StyledHomeRow>;
};
const StyledHomeRow = styled(motion.div)``;
export default HomeRow;
