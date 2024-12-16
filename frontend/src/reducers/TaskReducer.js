import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState();
      const userId = state.user.userId;

      if (!userId) {
        return rejectWithValue("User not logged in or invalid userId.");
      }

      // Extract query params from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const priority = urlParams.get("priority");
      const status = urlParams.get("status");
      const sortBy = urlParams.get("sortBy"); // Get sorting field from query
      const order = urlParams.get("order"); // Get sorting order (asc or desc)

      // Validate sortBy field to ensure it's one of the allowed values
      const validSortFields = ["priority", "status", "createdAt","updatedAt"];
      if (sortBy && !validSortFields.includes(sortBy)) {
        return rejectWithValue(
          "Invalid sort field. Valid fields are 'priority', 'status', 'createdAt'."
        );
      }

      // Construct the URL based on query parameters
      let url = `http://localhost:5000/tasks/get/${userId}`;
      let queryParams = [];

      if (priority) {
        queryParams.push(`priority=${priority}`);
      }
      if (status) {
        queryParams.push(`status=${status}`);
      }
      if (sortBy) {
        queryParams.push(`sortBy=${sortBy}`);
      }
      if (order) {
        queryParams.push(`order=${order}`);
      }

      // Append query parameters to the URL
      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }

      // console.log("API URL:", url);
      const response = await axios.get(url);

      if (response.data.status === 1) {
        const tasks = response.data.tasks.map((task) => ({
          ...task,
          priority: task.priority || 1,
          completionStatus: task.completionStatus || false,
        }));

        return tasks;
      } else {
        return rejectWithValue(response.data.msg);
      }
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong.");
    }
  }
);


const TaskSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTask(state, { payload }) {
      state.data.push(payload);
      localStorage.setItem("tasks", JSON.stringify(state.data));
    },
    removeTask(state, { payload }) {
      state.data = state.data.filter((task) => task._id !== payload);
      localStorage.setItem("tasks", JSON.stringify(state.data));
    },
    loadTasksFromLocalStorage(state) {
      const tasks = localStorage.getItem("tasks");
      if (tasks) {
        state.data = JSON.parse(tasks);
      }
    },
    clearTasks(state) {
      state.data = [];
      localStorage.removeItem("tasks");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        localStorage.setItem("tasks", JSON.stringify(payload));
      })
      .addCase(fetchTasks.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Failed to fetch tasks.";
      })
      .addMatcher(
        (action) => action.type === "tasks/clearTasks",
        (state) => {
          state.data = [];
          state.loading = false;
          state.error = null;
        }
      );
  },
});

export const { addTask, removeTask, loadTasksFromLocalStorage, clearTasks } =
  TaskSlice.actions;
export default TaskSlice.reducer;
