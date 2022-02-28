import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

//Context

//Animations

import Chains from "components/Chains";
import Account from "components/Account/Account";

import Hambuger from "components/Hambuger";

const Nav = () => {
  const { isAuthenticated } = useMoralis();

  const [menuToggle, setMenuToggle] = useState(false);
  const { pathname } = useLocation();
  console.log(setMenuToggle);
  return (
    <StyledNav menuToggle={menuToggle}>
      <motion.div className="left">
        <Link to="/">
          <h2>ZENITH MARKET</h2>
        </Link>
      </motion.div>
      <motion.div className="middle">
        <motion.div className="link">
          <Link to="/market" className={pathname == "/market" && "active"}>
            Market
          </Link>
        </motion.div>
        <motion.div className="link">
          <Link to="/exchange" className={pathname == "/exchange" && "active"}>
            Exchange
          </Link>
        </motion.div>

        <motion.div className="link">
          <Link to="/assets" className={pathname == "/assets" && "active"}>
            {" "}
            Assets
          </Link>
        </motion.div>
      </motion.div>
      <motion.div className="right">
        {/* <span className="icon">
          <FontAwesomeIcon icon={faSearch} onClick={onOpen} />
        </span> */}

        <Chains />
        <Account />
      </motion.div>
      <motion.div className="mobileNav">
        <span className="icon">
          <Hambuger
            open={menuToggle}
            onClick={() => setMenuToggle(!menuToggle)}
          />
        </span>
        <div className="menu">
          <span className="account">
            <Chains />
            <Account />
          </span>
          <motion.div className="nav-links">
            <motion.div className="link" onClick={() => setMenuToggle(false)}>
              <Link to="/market" className={pathname == "/market" && "active"}>
                Market
              </Link>
            </motion.div>
            <motion.div className="link" onClick={() => setMenuToggle(false)}>
              <Link
                to="/exchange"
                className={pathname == "/exchange" && "active"}
              >
                Exchange
              </Link>
            </motion.div>

            {isAuthenticated && (
              <motion.div className="link" onClick={() => setMenuToggle(false)}>
                <Link
                  to="/assets"
                  className={pathname == "/assets" && "active"}
                >
                  {" "}
                  Assets
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </StyledNav>
  );
};

const StyledNav = styled(motion.div)`
  background: #0b172e;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  padding: 3rem 6.5rem;
  @media (max-width: 900px) {
    justify-content: space-between;
    padding: 2.5rem 1.5rem;
  }
  .left {
    width: 33%;
    @media (max-width: 900px) {
      width: auto;
      z-index: 3;
    }
    h2 {
      font-family: "Amiri", serif;
      color: white;
      font-weight: bold;
      font-size: 1.6rem;
      /* background: -webkit-linear-gradient(#09e1ff, #03ff85);
      -webkit-background-clip: text;
      -moz-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-text-fill-color: transparent; */
    }
  }
  .middle {
    width: 33%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    @media (max-width: 900px) {
      display: none;
    }
    .link {
      a {
        color: white;
        font-size: 1.2rem;
        &:hover {
          background: -webkit-linear-gradient(#09e1ff, #03ff85);
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -webkit-text-fill-color: transparent;
          -moz-text-fill-color: transparent;
        }
      }
      .active {
        background: -webkit-linear-gradient(#09e1ff, #03ff85);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
      }
    }
  }
  .right {
    width: 33%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    margin-left: auto;
    @media (max-width: 900px) {
      display: none;
    }
    .icon {
      cursor: pointer;
      font-size: 1.3rem;
    }
  }
  .mobileNav {
    display: none;
    @media (max-width: 900px) {
      display: flex;
    }
    transition: all 0.5s;
    .icon {
      position: relative;
      z-index: 3;
    }
    .menu {
      padding: 2rem;
      padding-top: 7rem;
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      gap: 1rem;
      background: #0b172e;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      transform: translateX(-100%);
      transform: ${({ menuToggle }) =>
        menuToggle ? "translateX(0%)" : "translateX(-100%)"};
      z-index: 2;
    }
    .nav-links {
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      a {
        font-size: 1.3rem;
        &:hover {
          background: -webkit-linear-gradient(#09e1ff, #03ff85);
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -webkit-text-fill-color: transparent;
          -moz-text-fill-color: transparent;
        }
      }
      .active {
        background: -webkit-linear-gradient(#09e1ff, #03ff85);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
      }
    }
    .account {
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      gap: 1rem;
    }
  }
`;

export default Nav;
