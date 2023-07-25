//@ts-nocheck

import { NavLink, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Bars from "../../../assets/icons/bars.svg";
import Close from "../../../assets/icons/close.svg";
import Logo from "../../../assets/icons/logo.svg";
import { styled } from "styled-components";
import { phones, tablets } from "../../../utils";

export const NavbarContainer = styled.div`
  background-color: #fffefe;
  box-shadow: 0 0 1px 1px rgba(33, 41, 63, 0.1);
  /* position:fixed;
  top:0;
  width:100%; */
  nav {
    height: 8rem;
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .mobile-nav {
      display: none;
    }

    .logo {
      display: flex;
      font-weight: 700;
      font-size: 1.6rem;
      text-decoration: none;
      color: #21293c;
      transition: all 0.3s ease;
      overflow: hidden;

      &:hover {
        color: rgb(111, 207, 151);
      }

      img {
        height: 24px;
        width: 24px;
        margin-right: 0.4rem;
      }
    }

    ul {
      list-style: none;
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
        }

        button {
          padding: 0.8rem 1.6rem;
          font-family: inherit;
          font-size: 1.2rem;
          font-weight: 500;
          color: #fff;
          border: none;
          border-radius: 4px;
          background-color: #8a5cf7;
          cursor: pointer;
          transition: 0.3s all;
          margin-left: 2rem;
          &:hover {
            opacity: 0.9;
          }
        }

        a {
          text-decoration: none;
          font-size: 1.4rem;
          font-weight: 500;
          color: #4b587c;
          margin-left: 2rem;
          transition: all 0.3s ease;
          &:hover {
            color: rgb(111, 207, 151);
          }
        }
      }
    }
  }

  @media (${tablets}) {
    // Styles for tablets (if needed)
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (${phones}) {
    padding: 0 2rem;
    nav {
      ul {
        display: none;
      }
      .mobile-nav {
        display: block;

        height: 20px;
        width: 20px;
      }
    }
  }
`;

export const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <NavbarContainer>
      <Toaster
        containerClassName="toast"
        toastOptions={{
          style: {
            fontSize: "16px",
          },
        }}
      />
      <nav>
        <NavLink className="logo" to="/">
          ReclaimID
          <img src={Logo} alt="logo" />
        </NavLink>
        <ul>
          <li>
            <NavLink to="/profile"> Explorer</NavLink>
          </li>
        </ul>
        {/* mobile-nav */}

        {open ? (
          <div className="mobile-nav">
            <img src={Close} alt="close" onClick={() => setOpen(!open)} />
          </div>
        ) : (
          <div className="mobile-nav">
            <img src={Bars} alt="open" onClick={() => setOpen(!open)} />
          </div>
        )}

        {/* {open && (
          <div className="mobile-nav mob-nav">
            <ul>
              <li>
                <NavLink to="/how-it-works" onClick={() => setOpen(!open)}>
                  {" "}
                  How It Works?
                </NavLink>
                <NavLink to="/about" onClick={() => setOpen(!open)}>
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        )} */}
      </nav>
    </NavbarContainer>
  );
};
