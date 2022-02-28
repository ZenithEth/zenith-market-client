import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "react-lottie";
import { motion } from "framer-motion";
import styled from "styled-components";

import Button from "./Button";

import snake from "../assets/animations/snake.json";
import { fade, aboutProjectAnimation } from "../animation";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: snake,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const AboutProject = () => {
  const navigate = useNavigate();

  return (
    <StyledAboutProject
      variants={aboutProjectAnimation}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.5 }}
    >
      <motion.div variants={fade} className="left">
        <motion.div className="about-text">
          <h1>Welcome to Zenith Market, home for the best </h1>{" "}
          <h1 className="text-gradient">NFT's</h1>
        </motion.div>
        <span>
          {" "}
          A community controlled NFT market, we are the future of
          decentralization
        </span>
        <div className="buttonRow">
          <Button title="Explore" onClick={() => navigate("market")} />{" "}
          <Link to="/exchange" className="text-gradient">
            View exchange
          </Link>
        </div>
        <div className="stats">
          <span>
            <h3>50+</h3>
            <span>NFT's</span>
          </span>
          <div className="stats-divide"></div>
          <span>
            <h3>500+</h3>
            <span>PR</span>
          </span>
          <div className="stats-divide"></div>
          <span>
            <h3>100+</h3>
            <span>Community</span>
          </span>
        </div>
      </motion.div>
      <motion.div className="right" variants={fade}>
        <motion.div className="container-border">
          <Image>
            <Lottie
              options={defaultOptions}

              // isStopped={this.state.isStopped}
              // isPaused={this.state.isPaused}
            />
          </Image>
        </motion.div>
      </motion.div>
    </StyledAboutProject>
  );
};
const StyledAboutProject = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding-top: 4rem;
  padding-bottom: 0rem;
  background: #0b172e;
  overflow: hidden;
  color: white;
  width: 100%;
  @media (max-width: 900px) {
    flex-flow: column wrap;
    padding-top: 1rem;
    padding-bottom: 0rem;
  }
  .right {
    width: 50%;
    display: flex;
    justify-content: center;
    padding: 0rem 3rem 3rem 3rem;
    .container-border {
      padding: 0.1rem 0.1rem 0rem 0.1rem;

      border-radius: 1rem 1rem 0rem 0rem;
    }
    @media (max-width: 900px) {
      padding: 0rem 0rem 0rem 0rem;
      width: auto;
      gap: 0rem;
    }
  }
  .left {
    width: 50%;
    display: flex;
    flex-flow: column wrap;
    gap: 1.8rem;
    @media (max-width: 900px) {
      width: auto;
      gap: 0rem;
    }
    h1 {
      font-family: "Amiri", serif;
      font-size: 4rem;
      font-weight: normal;
      color: white;
      line-height: 5rem;
      @media (max-width: 900px) {
        font-size: 2.6rem;
        line-height: 3.5rem;
      }
    }
    span {
      color: #e5e5e5;
      font-family: "Urbanist", sans-serif;
      font-size: 1rem;
      padding-bottom: 2rem;
    }
    .about-text {
      h1 {
        display: inline;
      }
    }
    .buttonRow {
      display: flex;
      align-items: center;
      gap: 2rem;
      a {
      }
    }
    .stats {
      display: flex;
      gap: 4rem;
      padding-top: 3.5rem;
      @media (max-width: 900px) {
        padding-top: 3rem;
        gap: 0rem;
        width: 100%;
        justify-content: space-between;
      }
      .stats-divide {
        height: 4rem;
        width: 0.05rem;
        background: #e5e5e5;
        @media (max-width: 900px) {
          height: 3rem;
        }
      }
      span {
        display: flex;
        flex-flow: column wrap;
        gap: 1rem;
        justify-content: flex-start;
        @media (max-width: 900px) {
          gap: 0.7rem;
        }
        h3 {
          font-family: "Urbanist", sans-serif;
          color: white;
          font-size: 1.2rem;
          font-weight: bold;
          @media (max-width: 900px) {
            font-size: 1rem;
          }
        }
      }
    }
  }
`;
const Image = styled(motion.div)`
  z-index: 2;
  font-size: 0.5rem;
  background: #0b172e;
  transform: scale(0.8);
  border-radius: 1rem 1rem 0rem 0rem;

  @media (max-width: 900px) {
    transform: scale(0.8);
    width: auto;
    padding: 1rem 0rem;
    font-size: 1rem;
  }
`;

export default AboutProject;
