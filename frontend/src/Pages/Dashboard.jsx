import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import BackButton from "./Components/BackButton";
import DashBar from "./Components/DashBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = () => {
    navigate("/"); // Navigate to the homepage
  };
  const [statistics, setStatistics] = useState(null);
  const [taskId, setTaskId] = useState(null); // State to store the taskId
  const { data: userId } = useSelector((state) => state.user); // Assuming `userId` is coming from Redux
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // console.log(userId);

  // Function to fetch the last taskId
  // const fetchLastTaskId = async (userId) => {
  //   let taskId = 1; // Default taskId

  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/tasks/last/${userId._id}`
  //     );
  //     console.log(response);

  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data && data.taskId) {
  //         console.log(data.taskId);
  //         taskId = data.taskId; // Increment the taskId
  //       }
  //     } else {
  //       console.error("Failed to fetch task:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching last task:", error);
  //   }

  //   return taskId;
  // };

  const fetchStatistics = async (userId) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/tasks/statistics/${userId._id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.pendingStatsByPriority)
        setStatistics(data); // Store API response in state
      } else {
        console.error("Failed to fetch statistics:", response.status);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchStatistics(userId);
    }
  }, [userId]);

 // Runs when `userId` changes

  return (
    <div>
      <Header />
      <div className="w-full h-32"></div>
      <div className="w-full min-h-screen bg-[#ede7b1] relative flex">
        <div className="w-full p-10">
          <div onClick={handleClick}>
            <BackButton />
          </div>
          <div className="mt-4 p-10">
            <DashBar statistics={statistics} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
