import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import AddButton from "./Components/AddButton";
import TaskCard from "./Components/TaskCard";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import LoginAsker from "./Components/LoginAsker";
import AddTaskAsker from "./Components/AddTaskAsker";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import SideBar from "./Components/SideBar";
import { fetchTasks } from "../reducers/TaskReducer";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [statusFilter, setStatusFilter] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [sortField, setSortField] = useState(null); // For sorting by start or end date
  const [sortOrder, setSortOrder] = useState(null);

  const tasks = useSelector((state) => state.tasks.data);
  // const fetchError = useSelector((state) => state.tasks.error);
  const { data: user } = useSelector((state) => state.user);

  // Extract query params from URL and update state
 useEffect(() => {
   const params = queryString.parse(location.search);
   setStatusFilter(params.status || null);
   setPriorityFilter(params.priority || null);
   setSortField(params.sortField || null); // Get sort field from URL params
   setSortOrder(params.sortOrder || null); // Get sort order from URL params
 }, [location]);

  // Fetch tasks based on the selected filter
useEffect(() => {
  if (user) {
    dispatch(
      fetchTasks({ statusFilter, priorityFilter, sortField, sortOrder })

    );
  }
}, [statusFilter, priorityFilter, sortField, sortOrder, user, dispatch]);



  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    const newParams = { ...queryString.parse(location.search), status: value };
    navigate({ search: queryString.stringify(newParams) });
  };

  const handlePriorityFilterChange = (value) => {
    setPriorityFilter(value);
    const newParams = {
      ...queryString.parse(location.search),
      priority: value,
    };
    navigate({ search: queryString.stringify(newParams) });
  };

  const handleSidebarClick = () => {
    navigate("/dashboard"); // Navigate to the dashboard page
  };

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
    const newParams = {
      ...queryString.parse(location.search),
      sortBy: field,
      order: order,
    };
    navigate({ search: queryString.stringify(newParams) });
  };

  const clearFilters = () => {
    setStatusFilter(null);
    setPriorityFilter(null);
    navigate({ search: "" }); // Clears all query params
    if(user){
      dispatch(fetchTasks());
    }
  };

  return (
    <div className="w-full h-screen bg-[#ede7b1]">
      <Header />
      <div className="w-full h-36"></div>
      <div className="w-full min-h-screen bg-[#ede7b1] relative flex">
        <div className="w-4/5 p-5 flex flex-col">
          <div className="w-full mb-4 p-4 bg-white shadow-md rounded-lg flex justify-between items-center text-xl font-[1000]">
            <button className="px-4 py-2 text-[#61677A] rounded transition-all duration-300 hover:-translate-y-1">
              Filter By :
            </button>
            <button
              className="px-4 py-2 bg-[#61677A] text-white rounded transition-all duration-300 hover:bg-[#4d5569] hover:-translate-y-1"
              onClick={() => handleStatusFilterChange("true")}
            >
              Completed
            </button>
            <button
              className="px-4 py-2 bg-[#61677A] text-white rounded transition-all duration-300 hover:bg-[#4d5569] hover:-translate-y-1"
              onClick={() => handleStatusFilterChange("false")}
            >
              Not Completed
            </button>
            {[1, 2, 3, 4, 5].map((priority) => (
              <button
                key={priority}
                className="px-4 py-2 bg-[#61677A] text-white rounded transition-all duration-300 hover:bg-[#4d5569] hover:-translate-y-1"
                onClick={() => handlePriorityFilterChange(priority)}
              >
                Priority {priority}
              </button>
            ))}
          </div>

          <div className="w-full mb-4 p-4 bg-white shadow-md rounded-lg flex justify-between items-center text-xl font-[1000]">
            <button className="px-4 py-2 text-[#61677A] rounded transition-all duration-300 hover:-translate-y-1">
              Sorting Paramaters :
            </button>
            <button
              className="px-4 py-2 bg-[#61677A] text-white rounded transition-all duration-300 hover:bg-[#4d5569] hover:-translate-y-1"
              onClick={() => handleSortChange("createdAt", "asc")}
            >
              Sort by Start Date (Asc)
            </button>
            <button
              className="px-4 py-2 bg-[#61677A] text-white rounded transition-all duration-300 hover:bg-[#4d5569] hover:-translate-y-1"
              onClick={() => handleSortChange("createdAt", "desc")}
            >
              Sort by Start Date (Desc)
            </button>
            <button
              className="px-4 py-2 bg-[#61677A] text-white rounded transition-all duration-300 hover:bg-[#4d5569] hover:-translate-y-1"
              onClick={() => handleSortChange("updatedAt", "asc")}
            >
              Sort by End Date (Asc)
            </button>
            <button
              className="px-4 py-2 bg-[#61677A] text-white rounded transition-all duration-300 hover:bg-[#4d5569] hover:-translate-y-1"
              onClick={() => handleSortChange("updatedAt", "desc")}
            >
              Sort by End Date (Desc)
            </button>
          </div>

          {/* Display selected filters */}
          <div className="mt-4 flex gap-3 text-xl font-[1000]">
            <h3 className="text-4xl text-[#316B58]">Selected Filters:</h3>
            <div className="flex flex-col items-center text-2xl">
              {statusFilter || priorityFilter ? (
                <>
                  {statusFilter && (
                    <p>
                      Status:{" "}
                      {statusFilter === "true" ? "Completed" : "Not Completed"}
                    </p>
                  )}
                  {priorityFilter && <p>Priority: {priorityFilter}</p>}
                </>
              ) : (
                <p>Nill</p>
              )}
            </div>
          </div>

          {/* Clear Filters button */}
          <button
            className="mt-4 mb-10 px-4 py-2 bg-red-500 text-white rounded card w-1/3 p-5 border-4 border-black shadow-[12px_12px_0px_#000] transition-transform duration-300 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[17px_17px_0px_#000]"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

          {!user ? (
            <LoginAsker />
          ) : (
            <div className="flex flex-wrap gap-4">
              <div className="p-4 flex flex-wrap gap-6">
                {tasks &&
                  tasks.map((task) => <TaskCard key={task._id} task={task} />)}
              </div>
            </div>
          )}
        </div>
        <div
          className="w-1/5 h-fit bg-[#f4f4f4] p-5 shadow-lg mt-5 rounded-2xl mr-3 cursor-pointer"
          onClick={handleSidebarClick}
        >
          <SideBar />
        </div>
        <div className="fixed bottom-4 right-4">
          <AddButton />
        </div>
      </div>
    </div>
  );
}

export default Home;
