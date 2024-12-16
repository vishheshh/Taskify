import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaStar, FaTrashAlt, FaEdit } from "react-icons/fa"; // Import trash icon for delete
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../reducers/TaskReducer";
import Checkbox from "./CheckBox";
import EditForm from "./EditForm";

const Card = ({ task }) => {
  const [status, setStatus] = useState(task.status);
  const [timeLeft, setTimeLeft] = useState("");
  // const { data: tasks, loading, error } = useSelector((state) => state.tasks);
  const tasks = useSelector((state) => state.tasks);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const [boxShadowColor, setBoxShadowColor] = useState("#000"); // State for dynamic box shadow color
  const [bgColor, setBgColor] = useState("#fff"); // Add state for background color
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    if (user) {
      dispatch(fetchTasks());
    }
  }, [dispatch, user]);

  if (!user) {
    return <StyledWrapper>Please log in to view tasks.</StyledWrapper>;
  }

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endTime = new Date(task.endTime);
      const diff = endTime - now;

      if (diff <= 0) {
        setTimeLeft("Time's up");
        setBoxShadowColor("#ff4d6d"); // Red when time's up
        setBgColor("#E5E1D5"); 

      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft(`${hours}h ${minutes}m left`);
        setBgColor("#fff");

        if (hours > 48) {
          setBoxShadowColor("#000"); // Black for long time left
        } else if (hours <= 48 && hours > 24) {
          setBoxShadowColor("#ff4d6d"); // Lighter red for tasks within 2 days
        } else if (hours <= 24) {
          setBoxShadowColor("#ff1a1a"); // Red for tasks within 1 day
        }
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute
    return () => clearInterval(timer);
  }, [task.endTime]);

const handleStatusChange = async () => {
  if (!user || timeLeft === "Time's up") {
    return; // Ensure user is logged in before making the request
  }

  try {
    const userID = user._id;
    const taskID = task.taskId;

    const response = await axios.patch(
      `${BACKEND_URL}/tasks/status/${userID}/${taskID}`,
      { status: !status }
    );

    if (response.status === 200) {
      setStatus(!status);

      // Calculate the time difference
      const now = new Date();
      const endTime = new Date(task.endTime);
      const diff = endTime - now;

      // Update boxShadowColor based on task completion and time left
      if (!status) {
        if (diff > 0) {
          setBoxShadowColor("#28a745"); // Green for completed tasks before the end time
        } else {
          setBoxShadowColor("#ff1a1a"); // Red for overdue tasks marked as complete
        }
      } else {
        if (diff <= 0) {
          setBoxShadowColor("#ff1a1a"); // Red for overdue tasks
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          if (hours > 48) {
            setBoxShadowColor("#000"); // Black for long time left
          } else if (hours <= 48 && hours > 24) {
            setBoxShadowColor("#ff4d6d"); // Lighter red for tasks within 2 days
          } else if (hours <= 24) {
            setBoxShadowColor("#ff1a1a"); // Red for tasks within 1 day
          }
        }
      }

      // Fetch updated tasks
      dispatch(fetchTasks());
    }
  } catch (error) {
    console.error("Error updating task status:", error);
  }
};


  const handleDelete = async () => {
    if (!user) {
      return;
    }

    try {
      const userID = user._id;
      const taskID = task.taskId;

      const response = await axios.delete(
        `${BACKEND_URL}/tasks/delete/${userID}/${taskID}`
      );

      if (response.status === 200) {
        dispatch(fetchTasks());
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <StyledWrapper boxShadowColor={boxShadowColor} bgColor={bgColor}>
      <div className="card flex flex-col justify-center overflow-auto">
        <div className="card__header">
          <span className="font-xl font-[1000]"></span>
          <span className="card__title">
            {task.taskId}. {task.taskTitle}
          </span>
        </div>
        <div className="card__priority">
          <span className="font-[1000] text-[#495057]">Priority:</span>
          <div className="card__stars">
            {[...Array(task.priority)].map((_, index) => (
              <FaStar key={index} className="star" />
            ))}
          </div>
        </div>

        <div className="card__time">
          <p>
            <strong className="font-[1000] text-[#495057]">Start Time:</strong>{" "}
            {new Date(task.startTime).toLocaleString()}
          </p>
          <p>
            <strong className="font-[1000] text-[#495057]">End Time:</strong>{" "}
            {new Date(task.endTime).toLocaleString()}
          </p>
          <p className="time-left mt-2 font-[1000] text-[#495057]">
            <strong>Time Left:</strong> {timeLeft}
          </p>
          <div className="card__status">
            <button
              onClick={handleStatusChange}
              className="mt-3 font-[1000] p-2 flex gap-3 items-center justify-center w-full bg-slate-200 hover:hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform duration-300 ease-in-out"
            >
              {status ? "Task Completed" : "Done?"}
              <Checkbox isChecked={status} />
            </button>
          </div>
          <div className="w-full  flex justify-center items-center hover:hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform duration-300 ease-in-out">
            <button onClick={handleDelete} className="delete-button rounded-xl">
              <FaTrashAlt size={20} />
            </button>
            <button
              onClick={() => {
                if (timeLeft !== "Time's up") {
                  setIsEditOpen(true); // Toggle form visibility only if timeLeft is not "Time's up"
                }
              }}
              className="edit-button ml-4 rounded-xl"
            >
              <FaEdit size={20} />
            </button>
          </div>
        </div>
      </div>
      {isEditOpen && (
        <EditForm
          task={task} // Pass task data to the form
          closeForm={() => setIsEditOpen(false)} // Close form handler
        />
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    height: 420px;
    width: 300px;
    padding: 20px;
    // background: #fff;
    background: ${(props) => props.bgColor}; // Use the bgColor prop here
    transition: background 0.3s ease-in-out; // Smooth transition for background color change
    border: 6px solid #000;
    box-shadow: ${(props) =>
      `12px 12px 0 ${props.boxShadowColor}`}; /* Dynamic box shadow color */
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .card:hover {
    transform: translate(-5px, -5px);
    box-shadow: ${(props) =>
      `17px 17px 0 ${props.boxShadowColor}`}; /* Hover effect with dynamic color */
  }

  .card__title {
    font-size: 32px;
    font-weight: 900;
    color: #346652;
    text-transform: uppercase;
    margin-bottom: 15px;
    display: block;
    position: relative;
    overflow: hidden;
  }

  .card__title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 3px;
    background-color: #000;
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .card:hover .card__title::after {
    transform: translateX(0);
  }

  .card__content {
    font-size: 16px;
    line-height: 1.4;
    color: #000;
    margin-bottom: 20px;
  }

  .card__form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .card__form input {
    padding: 10px;
    border: 3px solid #000;
    font-size: 16px;
    font-family: inherit;
    transition: transform 0.3s;
    width: calc(100% - 26px);
  }

  .card__form input:focus {
    outline: none;
    transform: scale(1.05);
    background-color: #000;
    color: #ffffff;
  }

  .card__button {
    border: 3px solid #000;
    background: #000;
    color: #fff;
    padding: 10px;
    font-size: 18px;
    left: 20%;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s;
    width: 50%;
    height: 100%;
  }

  .card__button::before {
    content: "Sure?";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 105%;
    background-color: #5ad641;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(100%);
    transition: transform 0.3s;
  }

  .card__button:hover::before {
    transform: translateY(0);
  }

  .card__button:active {
    transform: scale(0.95);
  }

  .glitch {
    animation: glitch 0.3s infinite;
  }

  .card__priority {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .card__stars {
    display: flex;
    margin-left: 10px;
  }

  .star {
    color: #fbbf24;
    margin-right: 5px;
  }

  .card__status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .status-button {
    background: #000;
    color: #fff;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }

  .status-button:hover {
    background: #444;
  }

  .card__buttons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }

  .delete-button {
    background: #ff4d6d;
    color: white;
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    transition: background 0.3s;
  }
  .edit-button {
    background: #606c38;
    color: white;
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    transition: background 0.3s;
  }
  .edit-button:hover {
    background: #316b58;
  }

  .delete-button:hover {
    background: #ff1a1a;
  }

  .time-left {
    font-weight: bold;
  }
`;

export default Card;
