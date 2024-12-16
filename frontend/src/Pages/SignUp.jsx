import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./Components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Mock API request. Replace with your API call.
      const response = await fetch(`${BACKEND_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // toast.success("Thanks for signing in, let's log you in now!");
        navigate("/login");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <StyledWrapper>
        <div className="bg-white rounded-3xl flex flex-col items-center justify-center">
          <div className="flex items-center font-[1000] text-6xl text-[#356854] tracking-tight">
            <Logo />
            Taskify
          </div>
          <div className="font-[1000] text-3xl text-[#FFC0CB]">
            Let's Create Your Account!
          </div>
          <form onSubmit={handleSignUp} className="login__container">
            <div className="input__container">
              <div className="shadow__input" />
              <input
                type="text"
                name="name"
                className="input__search"
                placeholder="Enter username"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input__container">
              <div className="shadow__input" />
              <input
                type="email"
                name="email"
                className="input__search"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input__container">
              <div className="shadow__input" />
              <input
                type="password"
                name="password"
                className="input__search"
                placeholder="Create password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mx-auto text-[#666]">
              Already have an account?
              <Link
                to="/login"
                className="text-[#E9B50B] hover:underline ml-2 text-xl font-[1000]"
              >
                Log In
              </Link>
            </div>
            <button type="submit" className="submit__button">
              Sign Up
            </button>
          </form>
        </div>
      </StyledWrapper>
    </div>
  );
};


const StyledWrapper = styled.div`
  background-color: pink;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .login__container {
    background: #fff;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 70px;
    width: 500px;
  }

  .input__container {
    position: relative;
    background: #f0f0f0;
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    border: 4px solid #000;
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    transform-style: preserve-3d;
    transform: rotateX(10deg) rotateY(-10deg);
    perspective: 1000px;
    box-shadow: 10px 10px 0 #000;
  }

  .input__container:hover {
    transform: rotateX(5deg) rotateY(1deg) scale(1.05);
    box-shadow: 25px 25px 0 -5px #e9b50b, 25px 25px 0 0 #000;
  }

  .shadow__input {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
    transform: translateZ(-50px);
    background: linear-gradient(
      45deg,
      rgba(255, 107, 107, 0.4) 0%,
      rgba(255, 107, 107, 0.1) 100%
    );
    filter: blur(20px);
  }

  .input__button__shadow {
    cursor: pointer;
    border: 3px solid #000;
    background: #e9b50b;
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transform: translateZ(20px);
    position: relative;
    z-index: 3;
    font-weight: bold;
    text-transform: uppercase;
  }

  .input__button__shadow:hover {
    background: #e9b50b;
    transform: translateZ(10px) translateX(-5px) translateY(-5px);
    box-shadow: 5px 5px 0 0 #000;
  }

  .input__button__shadow svg {
    fill: #000;
    width: 25px;
    height: 25px;
  }

  .input__search {
    width: 100%;
    outline: none;
    border: 3px solid #000;
    padding: 15px;
    font-size: 18px;
    background: #fff;
    color: #000;
    transform: translateZ(10px);
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    z-index: 3;
    font-family: "Roboto", Arial, sans-serif;
    letter-spacing: -0.5px;
  }

  .input__search::placeholder {
    color: #666;
    font-weight: bold;
    text-transform: uppercase;
  }

  .input__search:hover,
  .input__search:focus {
    background: #f0f0f0;
    transform: translateZ(20px) translateX(-5px) translateY(-5px);
    box-shadow: 5px 5px 0 0 #000;
  }

  .input__container::before {
    content: "USERNAME";
    position: absolute;
    top: -15px;
    left: 20px;
    background: #e9b50b;
    color: #000;
    font-weight: bold;
    padding: 5px 10px;
    font-size: 14px;
    transform: translateZ(50px);
    z-index: 4;
    border: 2px solid #000;
  }

  .input__container:nth-of-type(2)::before {
    content: "EMAIL";
    position: absolute;
    top: -15px;
    left: 20px;
    background: #e9b50b;
    color: #000;
    font-weight: bold;
    padding: 5px 10px;
    font-size: 14px;
    transform: translateZ(50px);
    z-index: 4;
    border: 2px solid #000;
  }

  .input__container:nth-of-type(3)::before {
    content: "PASSWORD";
    position: absolute;
    top: -15px;
    left: 20px;
    background: #e9b50b;
    color: #000;
    font-weight: bold;
  }
  .submit__button {
    background: #e9b50b;
    padding: 15px;
    border: 3px solid #000;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 18px;
    transition: all 300ms ease;
    width: 100%;
    text-align: center;
  }

  .submit__button:hover {
    background: #f0f0f0;
    transform: translateY(-5px);
    box-shadow: 5px 5px 0 0 #000;
  }
`;

export default SignUp;
