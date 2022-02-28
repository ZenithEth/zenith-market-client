import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Card = ({ title, onClick, variants }) => {
  return (
    <StyledCard onClick={onClick} variant={variants}>
      <h1>{title}</h1>
    </StyledCard>
  );
};
const StyledCard = styled(motion.div)`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  color: black;
  background-image: linear-gradient(to right, #09e1ff, #03ff85);
`;
export default Card;
