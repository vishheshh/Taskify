import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";

const SideBar = () => {
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);
  const { data: user } = useSelector((state) => state.user);
  const tasks = useSelector((state) => state.tasks.data);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchStatistics = async (userId) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/tasks/statistics/${userId._id}`
      );
      if (response.ok) {
        const data = await response.json();
        setStatistics(data); // Store API response in state
        fetchStatistics(user);
      } else {
        setError("Refresh Once to See stats");
        console.error("Refresh Once to See stats", response.status);
      }
    } catch (error) {
      setError("Error fetching statistics.");
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStatistics(user);
    }
  }, [user,setStatistics,data.length]);

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  if (!user) {
    return (
      <div className="text-center p-4">
        <h2 className="text-lg font-bold">Stats?</h2>
        <p>Please log in to see your them !!.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 h-fit mb-10 w-full px-6 py-2 text-black rounded card p-5 border-4 border-black shadow-[12px_12px_0px_#000] transition-transform duration-300 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[17px_17px_0px_#000] relative">
      <h2 className="text-5xl font-[1000] mb-4 ">Stats.</h2>
      {error ? (
        <p className="">{error}</p>
      ) : !statistics ? (
        <p>Loading...</p>
      ) : (
        <div className="">
          <p className="text-4xl font-[1000] flex gap-2 items-baseline">
            Total Tasks:{" "}
            <div className="text-5xl font-[1000] text-[#316B58]">
              {statistics.totalTasks}
            </div>
          </p>
          <p className="text-3xl font-[1000] text-[#316B58]">Completed:</p>
          <div className="text-4xl font-[1000]">
            {statistics.completedTasksPercent}%
          </div>
          <p className="text-3xl text-[#316B58] font-[1000]">Pending:</p>
          <div className="text-4xl font-[1000]">
            {statistics.pendingTasksPercent}%
          </div>
          <h3 className="text-3xl font-[1000] text-[#316B58]">
            Average Completion Time:
          </h3>
          <p className="text-4xl font-[1000]">
            {statistics.averageCompletionTime} hrs
          </p>
        </div>
      )}
      {/* Hover button */}
      <button
        onClick={handleGoToDashboard}
        className="px-4 py-2 mb-10 mt-10 mx-auto text-black rounded card w-5/6 p-5 border-4 border-black shadow-[6px_6px_0px_#000] transition-transform duration-300 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[17px_17px_0px_#000] font-[1000] text-3xl"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default SideBar;
