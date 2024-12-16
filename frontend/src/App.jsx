import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import NoteFound from "./Pages/NoteFound";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { useDispatch } from "react-redux";
import { lsLogin } from "./reducers/UserReducer";
import { fetchTasks, loadTasksFromLocalStorage } from "./reducers/TaskReducer";
import Dashboard from "./Pages/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path:"/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "*",
    element: <NoteFound />,
  },
]);

function App() {
  //for making sure user is logged in even after refresh 
  const dispatch = useDispatch()
    useEffect(() => {
      dispatch(lsLogin());
      // dispatch(loadTasksFromLocalStorage());
      // dispatch(fetchTasks())
    }, [dispatch]);
  return <RouterProvider router={routes} />;
}

export default App;
