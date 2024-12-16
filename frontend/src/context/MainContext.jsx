import React, { createContext, useState } from "react";
import axios from "axios";

const context = createContext();

export default function MainContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async (userId) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:5000/tasks/get/${userId}`
      );
      if (response.data.status === 1) {
        setTasks(response.data.tasks); 
      } else {
        setError("Failed to fetch tasks. Please try again.");
      }
    } catch (err) {
      setError("Failed to fetch tasks. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    tasks, // Expose tasks globally
    loading, // Expose loading state globally
    error, // Expose error state globally
    fetchTasks, // Expose fetchTasks function globally
  };

  return <context.Provider value={value}>{children}</context.Provider>;
}

export { context };
