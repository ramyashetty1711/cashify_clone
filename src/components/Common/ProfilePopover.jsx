import { useEffect, useRef, useState } from "react";
import { TiUser } from "react-icons/ti";
import { IoIosSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { PiMoonFill } from "react-icons/pi";
import { HiSun } from "react-icons/hi";
import { SpinnerCircular } from "spinners-react";
import { useNavigate } from "react-router-dom";

const ProfilePopover = () => {
  const [ShowPopover, setShowPopover] = useState(false);
  const [DarkMode, setDarkMode] = useState(false);
  const [LogoutLoading, setLogoutLoading] = useState(false);
  const Navigate = useNavigate();
  const ProfileRef = useRef(null);
  useEffect(() => {
    const clickhandler = (e) => {
      if (ProfileRef.current && !ProfileRef.current.contains(e.target)) {
        setShowPopover(false);
      }
    };

    window.addEventListener("click", clickhandler);

    return () => {
      window.removeEventListener("click", clickhandler);
    };
  }, []);

  useEffect(() => {
    const dark = localStorage.getItem("theme") === "dark";
    if (dark) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <div className="relative " ref={ProfileRef}>
      <div
        className={` w-fit text-gray-500 font-semibold h-fit ms-2 px-1 py-1 rounded-[50%] border-2 border-purple-500 hover:text-white  hover:bg-[linear-gradient(152deg,#9810fa,#c27aff,#6b00b7)] transition-all duration-300 hover:text-[1.075em] ease-in-out cursor-pointer ${
          ShowPopover
            ? "bg-[linear-gradient(152deg,#9810fa,#c27aff,#6b00b7)] text-white"
            : ""
        }`}
        onClick={() => {
          setShowPopover((prev) => !prev);
        }}
      >
        <TiUser size={30} />
      </div>
      <div
        className={`${
          ShowPopover ? "block" : "hidden"
        } min-h-[10vh] absolute z-[101] bg-white right-0 min-w-[15vw] rounded-xl top-[135%] transition-all duration-300 flex flex-col pt-2 px-4`}
      >
        <div className="text-[1.25em] text-gray-600 font-semibold text-start flex flex-row justify-between items-center">
          Username
          <div
            className="bg-gray-200 h-fit min-w-[1em] p-2 rounded-3xl cursor-pointer group transition-all duration-500 hover:shadow-md hover:shadow-gray-400"
            onClick={(e) => {
              e.stopPropagation();
              setDarkMode((prev) => !prev);
              toggleDarkMode();
            }}
          >
            {DarkMode ? (
              <HiSun
                className="transition-all duration-[800ms] ease-in-out opacity-100 group-hover:scale-110 "
                size={22}
              />
            ) : (
              <PiMoonFill
                className="transition-all duration-[800ms] ease-in-out opacity-100 group-hover:scale-110"
                size={22}
              />
            )}
          </div>
        </div>

        <ul className="text-gray-500 text-start mt-4 ">
          {/* <li className=" border-b-2 border-b-gray-100 text-[0.9em] flex flex-row pb-2 transition-all duration-300 mb-2 hover:scale-[1.05] cursor-pointer hover:ps-2">
            <IoIosSettings size={20} className="me-2" /> Settings
          </li> */}
          <li
            className={` border-b-2 border-b-gray-100 text-[0.9em] flex flex-row pb-2 text-red-600 transition-all duration-300 mb-2 hover:scale-[1.05]  hover:ps-2 ${
              LogoutLoading ? "cursor-progress" : "cursor-pointer"
            }`}
            onClick={() => {
              setLogoutLoading(true);
              setTimeout(() => {
                setLogoutLoading(false);
                Navigate("/");
              }, 3000);
            }}
          >
            {LogoutLoading ? (
              <SpinnerCircular
                color="red"
                size={20}
                thickness={200}
                className="me-2"
                secondaryColor="#a4a4a4"
              />
            ) : (
              <IoLogOut size={20} className="me-2 " />
            )}{" "}
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePopover;
