import React from "react";
import styled from "styled-components";

const AboutButton = ({ title, onClick, style, variant }) => {
  return (
    <StyledAboutButton onClick={onClick} style={style}>
      <h1>{title}</h1>
    </StyledAboutButton>
  );
};
const StyledAboutButton = styled.button`
  display: flex;
  align-items: center;
  width: 5rem;
  padding: 1rem;
  border-radius: 20px 0px 20px 0px;
  background-image: linear-gradient(to right, #09e1ff, #03ff85);
  color: black;
  transition: all 0.5s ease-in-out;
  &:hover {
    cursor: pointer;
  }
  &:focus {
  }
`;
export default AboutButton;
