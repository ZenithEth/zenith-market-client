import React from "react";
import styled from "styled-components";

import { motion } from "framer-motion";

//Context

//Icons
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
const Footer = () => {
  return (
    <StyledFooter>
      <div className="icons">
        <a
          href="http://www.twitter.com/janvinsha"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <TwitterIcon className="icon" />
        </a>

        <a
          href="https://www.linkedin.com/in/jande-vincent-1650431b9"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedInIcon className="icon" />
        </a>
        <a href="http://github.com/janvinsha" target="_blank" rel="noreferrer">
          <GitHubIcon className="icon" />
        </a>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled(motion.div)`
  padding: 2rem;
  display: flex;
  justify-content: center;
  background: #0b172e;
  .icons {
    width: 15rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      font-size: 2rem;
      color: white;
      &:hover {
        color: #50c1e9;
      }
    }
  }
`;
export default Footer;
