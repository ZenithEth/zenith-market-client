import React from "react";
import styled from "styled-components";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const Button = ({ title, onClick, style, showIcon = true }) => {
  return (
    <StyledButton onClick={onClick} style={style}>
      {title}
      {showIcon ? <ArrowRightAltIcon fontSize="large" color="primary" /> : ""}
    </StyledButton>
  );
};
const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 8rem;
  padding: 0.4rem 1.4rem;
  border-radius: 0.2rem;
  background-image: linear-gradient(to right, #09e1ff, #03ff85);
  transition: all 0.5s ease-in-out;
  font-size: 18px;
  gap: 1rem;
  color: black;
  font-family: "Urbanist", sans-serif;
  font-weight: normal;
  font-size: 1rem;
  padding: 0px;

  &:hover {
    cursor: pointer;
  }
  &:focus {
  }
`;
export default Button;
