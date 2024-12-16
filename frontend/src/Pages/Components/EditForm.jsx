import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchTasks } from "../../reducers/TaskReducer";

const EditForm = ({ task, closeForm }) => {
  const [taskTitle, setTaskTitle] = useState(task.taskTitle);
  const [beginTime, setBeginTime] = useState(task.startTime.value);
  const [endTime, setEndTime] = useState(task.endTime.value);
  const [priority, setPriority] = useState(task.priority);
  const [error, setError] = useState("");
  const [taskId, setTaskId] = useState(task.taskId);
  const [userId, setUserId] = useState(task.userId);
  const [status, setStatus] = useState(task.status);
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  //   console.log(taskId)
  //   console.log(userId)
  
  const dispatch = useDispatch();
  useEffect(() => {
    
      dispatch(fetchTasks());
    
  }, [dispatch]);


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!taskTitle || !beginTime || !endTime || !priority) {
      setError("All fields are required");
      return;
    }
    // Add your API call to update the task here
        try {
    //   const userID = user._id;
    //   const taskID = task.taskId;
        const updatedTaskData = {
          taskTitle: taskTitle,
          startTime: beginTime,
          endTime: endTime,
          priority: priority,
          status: status, 
        };

      const response = await axios.put(
        `${BACKEND_URL}/tasks/edit/${userId}/${taskId}`,
        updatedTaskData
      );

      if (response.status === 200) {
        dispatch(fetchTasks());
        setStatus(!status);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
    closeForm();
  };

  return (
    <FormWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="font-[1000] text-3xl leading-tight mb-[-2vh] text-[#495057]">
          Edit Task
        </div>
        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="input"
        />
        <input
          type="datetime-local"
          placeholder="Start Time"
          value={beginTime}
          onChange={(e) => setBeginTime(e.target.value)}
          className="input"
        />
        <input
          type="datetime-local"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Priority (1-5)"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="input"
          min="1"
          max="5"
        />
        {error && <div className="error-message">{error}</div>}
        <button className="button-confirm" onClick={closeForm} type="button">
          Close
        </button>
        <button className="button-confirm" type="submit">
          Save Changes
        </button>
      </form>
    </FormWrapper>
  );
};

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


export default EditForm;
