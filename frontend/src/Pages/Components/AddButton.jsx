import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import axios from "axios"; // Import axios for making API requests
import { useDispatch, useSelector } from "react-redux";
import { addTask, fetchTasks } from "../../reducers/TaskReducer";

const AddButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [priority, setPriority] = useState(1);
  const [error, setError] = useState("");
  const formRef = useRef(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

    const { data: user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    // console.log(user._id);
const handleSubmit = async (e) => {
  e.preventDefault();

  // Get the values from the form inputs
  const taskTitle = e.target.taskTitle.value;
  const beginTime = e.target.beginTime.value;
  const endTime = e.target.endTime.value;
  const priority = e.target.priority.value;

  // Convert to the correct format for startTime and endTime
  const startTime = new Date(beginTime).toISOString(); // Convert to ISO string
  const formattedEndTime = new Date(endTime).toISOString(); // Convert to ISO string

  // Fetch the last task's ID
  let taskId = 1; // Default taskId if no tasks are present
  try {
    const response = await fetch(`${BACKEND_URL}/tasks/last/${user._id}`);
    // console.log(response.taskId)
    if (response.ok) {
      const data = await response.json();
      if (data && data.taskId) {
        taskId = data.taskId + 1; // Increment the taskId
      }
    }
  } catch (error) {
    console.error("Error fetching last task:", error);
  }

  const taskData = {
    taskId, // Incremented taskId
    taskTitle,
    priority: parseInt(priority),
    status: false, // Assuming task is active by default
    startTime,
    endTime: formattedEndTime,
    userId: `${user._id}`, // Replace with actual userId
  };

  try {
    // console.log(taskData)
    const response = await fetch(`${BACKEND_URL}/tasks/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      console.log("Task created successfully");
      // dispatch(addTask(newTask));
      // dispatch(fetchTasks());
      
      dispatch(addTask(taskData));
      handleCloseModal(); // Close modal after successful creation
            // setTaskTitle("");
            // setBeginTime("");
            // setEndTime("");
            // setPriority("");

    } else {
      console.error("Error creating task");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};



  useEffect(() => {
    if (isModalOpen) {
      gsap.fromTo(
        formRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isModalOpen]);

  return (
    <div>
      <StyledWrapper>
        <button type="button" className="button" onClick={handleOpenModal}>
          <span className="button__text">Add Task!</span>
          <span className="button__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
              height={24}
              fill="none"
              className="svg"
            >
              <line y2={19} y1={5} x2={12} x1={12} />
              <line y2={12} y1={12} x2={19} x1={5} />
            </svg>
          </span>
        </button>
      </StyledWrapper>

      {isModalOpen && (
        <FormWrapper ref={formRef}>
          <form className="form" onSubmit={handleSubmit}>
            <div className="font-[1000] text-3xl leading-tight mb-[-2vh] text-[#495057]">
              Title
            </div>
            <input
              type="text"
              placeholder="Task Title"
              name="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="input"
            />
            <div className="font-[1000] text-3xl leading-tight mb-[-2vh] text-[#495057]">
              Start Time
            </div>
            <input
              type="datetime-local"
              placeholder="Task Begin Time"
              name="beginTime"
              value={beginTime}
              onChange={(e) => setBeginTime(e.target.value)}
              className="input"
            />
            <div className="font-[1000] text-3xl leading-tight mb-[-2vh] text-[#495057]">
              End Time
            </div>
            <input
              type="datetime-local"
              placeholder="Task End Time"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="input"
            />
            <div className="font-[1000] text-3xl leading-tight mb-[-2vh] text-[#495057]">
              Priority
            </div>
            <input
              type="number"
              placeholder="Priority (1-5)"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="input"
              min="1"
              max="5"
            />
            {error && <div className="error-message">{error}</div>}
            <button
              className="button-confirm"
              onClick={handleCloseModal}
              type="button"
            >
              Close
            </button>
            <button className="button-confirm" type="submit">
              Add Task
            </button>
            no form reset for tester's ease of use :)
          </form>
        </FormWrapper>
      )}
    </div>
  );
};

// const StyledWrapper = styled.div`
//   /* Styling for the button */
// `;

// const FormWrapper = styled.div`
//   /* Styling for the modal form */
//   .error-message {
//     color: red;
//     font-size: 14px;
//     margin-top: 10px;
//   }
// `;

// export default AddButton;


const StyledWrapper = styled.div`
  .button {
    --main-focus: #2d8cf0;
    --font-color: #dedede;
    --bg-color-sub: #3a5a40;
    --bg-color: #588157;
    --main-color: #dedede;
    position: relative;
    width: 150px;
    height: 80px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    background-color: var(--bg-color);
    border-radius: 30px;
    overflow: hidden;
  }

  .button,
  .button__icon,
  .button__text {
    transition: all 0.3s;
  }

  .button .button__text {
    transform: translateX(20px);
    color: var(--font-color);
    font-weight: 1000;
  }

  .button .button__icon {
    position: absolute;
    transform: translateX(109px);
    height: 100%;
    width: 39px;
    background-color: var(--bg-color-sub);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button .svg {
    width: 20px;
    stroke: var(--main-color);
  }

  .button:hover {
    background: var(--bg-color);
  }

  .button:hover .button__text {
    color: transparent;
  }

  .button:hover .button__icon {
    width: 148px;
    transform: translateX(0);
  }

  .button:active {
    transform: translate(3px, 3px);
    box-shadow: 0px 0px var(--main-color);
  }
`;

const FormWrapper = styled.div`
  .form {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --main-color: #323232;
    padding: 40px;
    background: lightgrey;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    border-radius: 10px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .title {
    color: var(--font-color);
    font-weight: 900;
    font-size: 20px;
    margin-bottom: 25px;
  }

  .title span {
    color: var(--font-color-sub);
    font-weight: 600;
    font-size: 17px;
  }

  .input {
    width: 400px;
    height: 80px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 18px;
    font-weight: 1000;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .input:focus {
    border: 2px solid var(--input-focus);
  }

  .button-confirm {
    margin: 30px auto 0 auto;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: #e9b50b;
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }
  .button-confirm {
    margin: 30px auto 0 auto;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: #e9b50b;
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .button-confirm:hover {
    background-color: white;
    color: #e9b50b; 
    border: 2px solid #495057; 
  }

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;



export default AddButton;
