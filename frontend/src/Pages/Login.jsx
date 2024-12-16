import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Components/Header";
import Logo from "./Components/Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../reducers/UserReducer";
import { fetchTasks } from "../reducers/TaskReducer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const handleLogin = async (e) => {
//   e.preventDefault();
//   setError(""); // Reset error before attempting login

//   try {
//     const response = await axios.post("http://localhost:5000/user/login", {
//       email,
//       password,
//     });

//     if (response.data.status === 1) {
//         dispatcher(
//           login({
//             token: response.data.token,
//             user: response.data.user,
//           })
//         );
//         dispatcher(fetchTasks());
//         // Additional logic for cart state if necessary
//         navigate("/");
      
//     } else {
//       setError(response.data.msg || "Login failed. Please try again.");
//     }

//     localStorage.setItem("token", response.data.token); // Save token
//   } catch (err) {
//     setError(err.response?.data?.message || "An error occurred during login.");
//     console.error("Login Error:", err);
//   }
// };

const handleLogin = async (e) => {
  e.preventDefault();
  setError(""); // Reset error before attempting login

  try {
    const response = await axios.post(`${BACKEND_URL}/user/login`, {
      email,
      password,
    });

    if (response.data.status === 1) {
      // If login is successful, dispatch the login action
      dispatcher(
        login({
          token: response.data.token,
          user: response.data.user,
        })
      );
      // console.log(response.data.user)
      // Check if response.data (user's tasks) is empty
      // if (response.data.tasks.length === 0) {
      //   // Create a new task if no tasks are found
      //   const currentTime = new Date();
      //   const startTime = currentTime.toISOString(); // Current time as start time
      //   const endTime = new Date(
      //     currentTime.getTime() + 30 * 1000
      //   ).toISOString(); // 30 seconds after as end time

      //   const taskData = {
      //     taskId: 1, // Dummy task ID
      //     taskTitle: "Dummy Task Title", // Example task title
      //     priority: 3, // Middle priority
      //     status: false, // Active status
      //     startTime: startTime, // Current time as start time
      //     endTime: endTime, // 30 seconds after current time as end time
      //     userId: response.data.user._id, // User ID from the response
      //   };

      //   // Call the task creation API
      //   const createTaskResponse = await axios.post(
      //     "http://localhost:5000/tasks/create",
      //     taskData
      //   );

      //   if (createTaskResponse.ok) {
      //     console.log("Task created successfully");
      //     dispatcher(addTask(taskData)); // Dispatch action to add task to the store
      //   } else {
      //     console.error("Error creating task");
      //   }
      // }

      // Dispatch fetchTasks after login to fetch the user's tasks
      dispatcher(fetchTasks());

      // Navigate to the homepage
      navigate("/");
    } else {
      setError(response.data.msg || "Login failed. Please try again.");
    }

    // Save the token to localStorage
    localStorage.setItem("token", response.data.token);
  } catch (err) {
    setError(err.response?.data?.message || "An error occurred during login.");
    console.error("Login Error:", err);
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
          <div className=" font-[1000] text-3xl text-[#FFC0CB]">
            Let's Log you in!
          </div>
          <div className="login__container">
            <div className="input__container">
              <div className="shadow__input" />
              <button className="input__button__shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  width="20px"
                  height="20px"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </button>
              <input
                type="email"
                name="email"
                className="input__search"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input__container">
              <div className="shadow__input" />
              <button className="input__button__shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  width="20px"
                  height="20px"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </button>
              <input
                type="password"
                name="password"
                className="input__search"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>}

            <div className="mx-auto text-[#666]">
              Don't have an Account yet?
              <Link
                to="/signup"
                className="text-[#E9B50B] hover:underline ml-2 text-xl font-[1000]"
              >
                Sign Up
              </Link>
            </div>

            <button className="submit__button" onClick={handleLogin}>
              Login
            </button>
          </div>
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

  .input__container:nth-of-type(2)::before {
    content: "PASSWORD";
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

export default Login;
