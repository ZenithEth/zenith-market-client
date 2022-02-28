import * as React from "react";
import {
  Modal as XModal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  CloseButton,
} from "@chakra-ui/react";
import styled from "styled-components";
const Modal = ({ isOpen, onClose, children, title }) => {
  return (
    <XModal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent bg="#1C1D21">
        <ModalBody
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem 2rem",
            overflow: "hidden",
          }}
        >
          <StyledTitle>
            <h2>{title}</h2> <CloseButton />{" "}
          </StyledTitle>
          {children}
        </ModalBody>
      </ModalContent>
    </XModal>
  );
};

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0rem;
  h2 {
    font-size: 1.4rem;
  }
`;

export default Modal;
