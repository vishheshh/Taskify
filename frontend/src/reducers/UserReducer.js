import { createSlice } from "@reduxjs/toolkit";



const UserSlice = createSlice(
  {
  name: "user",
  initialState: {
    data: null,
    token: null,
  },
  reducers: {
    login(currentState, { payload }) {
      // console.log("Login payload:", payload);
      currentState.data = payload.user;
      currentState.token = payload.token;
      currentState.userId = payload.user._id;
      // Cookies.set("token",payload.token );   
      localStorage.setItem("user", JSON.stringify(currentState));
      // console.log(JSON.stringify(currentState));
    },
    logout(currentState,) {
      // console.log("Logout called");
      currentState.data = null;
      currentState.token = null;
      localStorage.removeItem("user");
    },
    lsLogin(currentState) {
      const lsuser = localStorage.getItem("user");  
      if (lsuser) {
        const user = JSON.parse(lsuser);
        // console.log("LS Login user:", user);
        currentState.data = user.data;
        currentState.token = user.token;
        currentState.userId = user.userId;
      }
    },
  },
});
export const { login, logout, lsLogin } = UserSlice.actions;
export default UserSlice.reducer;
