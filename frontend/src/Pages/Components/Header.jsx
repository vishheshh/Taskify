import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/UserReducer";
import { clearTasks } from "../../reducers/TaskReducer";
import Logo from "./Logo";
import SignInAsker from "./SignInAsker";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const [scrollDirection, setScrollDirection] = useState("down");

  // Access user data from Redux store
  const { data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearTasks()); // Clear tasks from state and localStorage
    dispatch(logout()); // Logout the user
    console.log("User logged out");
  };

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset;

      if (currentScrollTop > lastScrollTop) {
        setScrollDirection("down");
      } else {
        setScrollDirection("down");
      }
      lastScrollTop = currentScrollTop < 0 ? 0 : currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`z-30 min-h-28 lg:h-34 rounded-b-2xl  ${
        scrollDirection === "up" ? "bg-[transparent]" : "bg-[#a2d2ff]"
      } transition-all duration-500 ease-in-out fixed top-0 w-full`}
    >
      <div className="w-full h-full flex justify-between md:justify-center items-center">
        <div className="w-full h-full flex justify-between items-center">
          <div className="hull">
            <Logo />
          </div>
          <span className="p-5 header-icons">
            <div className="relative flex gap-3 items-center">
              <div className="flex items-center gap-3 p-2 rounded-3xl">
                {/* Conditional rendering based on user login status */}
                {user ? (
                  <div className="flex items-center gap-2 py-2 px-3 rounded-3xl">
                    <span className="text-[#356854] font-[1000] text-xl">
                      <div>Hello, </div>
                      <div className="text-[#495057]">{user.name} !</div>
                    </span>
                    <div onClick={handleLogout} className="">
                      <LogoutBtn />
                    </div>
                  </div>
                ) : (
                  <SignInAsker />
                )}
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
