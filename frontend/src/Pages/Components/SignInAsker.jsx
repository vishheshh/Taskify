import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignInAsker = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <StyledWrapper>
      <button className="brutalist-button" onClick={handleClick}>
        <div className="button-text">
          <span>lOGIN / </span>
          <span>SIGN UP</span>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .brutalist-button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 169px;
    height: 60px;
    background-color: #000;
    color: #fff;
    text-decoration: none;
    font-family: Arial, sans-serif;
    font-weight: bold;
    border: 3px solid #fff;
    outline: 3px solid #000;
    box-shadow: 6px 6px 0 #00a4ef;
    transition: all 0.1s ease-out;
    padding: 0 15px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  .brutalist-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.8),
      transparent
    );
    z-index: 1;
    opacity: 1;
    animation: slide 5s linear infinite;
  }

  @keyframes slide {
    0% {
      left: -100%;
    }
    50% {
      left: 100%;
    }
    100% {
      left: -100%;
    }
  }

  .brutalist-button:hover {
    transform: translate(-4px, -4px);
    box-shadow: 10px 10px 0 #000;
    background-color: #000;
    color: #fff;
  }

  .brutalist-button:active {
    transform: translate(4px, 4px);
    box-shadow: 0px 0px 0 #00a4ef;
    background-color: #fff;
    color: #000;
    border-color: #000;
  }

  .button-text {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    transition: transform 0.2s ease-out;
    position: relative;
    z-index: 1;
  }

  .brutalist-button:hover .button-text {
    transform: skew(-5deg);
  }

  .brutalist-button:active .button-text {
    transform: skew(5deg);
  }

  .button-text span:first-child {
    font-size: 11px;
    text-transform: uppercase;
  }

  .button-text span:last-child {
    font-size: 16px;
    text-transform: uppercase;
  }
`;

export default SignInAsker;
