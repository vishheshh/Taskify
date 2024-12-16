import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Logo = () => {
  const navigate = useNavigate();
    const handleClick = () => {
      navigate("/"); // Navigate to the root ("/") path
    };
  return (
    <StyledWrapper>
      <div className="button-container">
        <button className="brutalist-button openai" onClick={handleClick}>
          <div className="openai-logo text-white">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="openai-icon"
            >
              <path
                fill="#10A37F"
                d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5907 8.3829 14.6108 7.2144a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.3927-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
              />'
            </svg> */}
            <img src="sun.svg" alt="" />
          </div>
          <div className="button-text">
            <span></span>
            <span>Taskify</span>
          </div>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button-container {
    display: flex;
    justify-content: center;
    gap: 20px; /* Adjust this value to increase or decrease space between buttons */
    padding: 20px;
  }

  .brutalist-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 3px solid #000000;
    border-radius: 12px;
    padding: 0;
    text-decoration: none;
    color: #000000;
    font-weight: bold;
    position: relative;
    box-shadow: 4px 4px 0px #000000;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    height: 100px;
    width: 100px;
    cursor: pointer;
  }

  .brutalist-button.openai {
    background-color: #356854;
  }

  .brutalist-button::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -150%;
    width: 300%;
    height: 300%;
    border-radius: 50%;
    transform: translateX(-50%) scale(0);
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    z-index: 1;
  }

  .brutalist-button.openai::before {
    background-color: #316b58;
  }

  .brutalist-button.claude::before {
    background-color: #e3d19c;
  }

  .brutalist-button:hover::before {
    transform: translateX(-50%) scale(1);
  }

  .brutalist-button:hover {
    transform: translate(-4px, -4px);
    box-shadow: 8px 8px 0px #000000;
  }

  .brutalist-button:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000000;
  }

  .openai-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .openai-logo {
    align-items: center;
    justify-content: center;
    background-color: #0f1715; /* OpenAI's green color */
    border-radius: 50%; /* This creates the circular background */
  }

  .openai-icon {
    width: 50px;
    height: 50px;
    fill: #ffffff; /* White color for the SVG */
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .brutalist-button:hover .openai-logo {
    animation: spin 5s linear infinite;
    width: 50px;
    height: 50px;
    top: 28%;
  }

  .brutalist-button:hover .openai-icon {
    transform: scale(0.6);
  }

  .button-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.3;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    z-index: 2;
    position: absolute;
    bottom: 18px;
    left: 0;
    right: 0;
  }

  .button-text span:first-child {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 2px;
  }

  .button-text span:last-child {
    font-size: 16px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #ffffff;
  }

  .brutalist-button:hover .button-text {
    opacity: 1;
    transform: translateY(0);
  }

  .brutalist-button.openai:hover .button-text {
    color: #d3d3d3;
  }

  .brutalist-button.openai:hover .button-text span:last-child {
    color: #d6cbbf;
  }

  @media (hover: hover) and (pointer: fine) {
    .brutalist-button:hover {
      transform: translate(-4px, -4px);
      box-shadow: 8px 8px 0px #000000;
    }
  }
`;

export default Logo;
