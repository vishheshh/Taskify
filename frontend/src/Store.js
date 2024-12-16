import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer"
import TaskReducer from "./reducers/TaskReducer"
const store = configureStore({
  reducer: {
    user: UserReducer,
    tasks: TaskReducer,
  },
});

export default store;
