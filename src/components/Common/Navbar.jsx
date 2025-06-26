import { ReactNode } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import Logo from "../../assets/Logo.png";
import { IoNotifications } from "react-icons/io5";
import { TbLiveView } from "react-icons/tb";
import { LuHistory } from "react-icons/lu";
import { IoIosGitNetwork } from "react-icons/io";
import { BiNetworkChart } from "react-icons/bi";
import { PiSpeedometerLight, PiUserCircleFill } from "react-icons/pi";
import { LuWaypoints } from "react-icons/lu";
import { BsDeviceSsd, BsCarFront } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import {
  MdOutlineCrisisAlert,
  MdOutlineNotificationImportant,
} from "react-icons/md";
import ProfilePopover from "./ProfilePopover";
import { Link, Outlet, useLocation } from "react-router-dom";
import SideBarProfile from "./SideBarProfile";

const Navbar = () => {
  const Location = useLocation();
  const MenuData = [
    {
      display: "Home",
      link: "/home",
    },
    {
      display: "SC Management",
      link: "/sc-management",
    },
    {
      display: "Work Order Management",
      link: "/workorder",
    },
    {
      display: "Report Management",
    },
  ];

  return (
    <>
      <div className="h-fit py-3 w-full bg-white hover:shadow-lg hover:shadow-purple-200 transition-all duration-500 flex flex-row justify-between relative z-[100]">
        <Link
          className="mx-4 self-center flex flex-row bg-[linear-gradient(102deg,#eb77ff,#f0e3f3)] rounded-lg"
          to={"/home"}
        >
          <img src={Logo} width={110} />
          {/* <h4 className="text-gray-400 font-bold">
            Elena <br />
            Geo Tech
          </h4> */}
        </Link>
        <div className=" w-full lg:w-fit lg:h-full py-8 lg:py-0 px-5 lg:px-0 flex flex-col lg:flex-row items-center lg:gap-10">
          <ul className="flex">
            {MenuData.map((menu, index) => (
              <li
                key={index}
                className={`relative group w-full lg:w-fit h-fit lg:h-full `}
              >
                <Link
                  to={menu.link}
                  className={` !bg-white group w-full focus:!outline-none !border-none lg:w-fit h-fit lg:h-full text-md px-4 py-2 hover:!border-none focus-within:!border-none not-hover:!border-none group-hover:!text-purple-600 transition-all duration-300  rounded-lg  font-[600] flex flex-row items-center ${
                    menu.children ? " " : " cursor-pointer"
                  } ${
                    Location.pathname.includes(menu.link)
                      ? " !text-purple-600 hover:!text-purple-700"
                      : "!text-gray-600"
                  } `}
                >
                  {menu.display}
                  {menu.children && (
                    <TiArrowSortedDown
                      className="ms-2 group-hover:rotate-[180deg] transition-all duration-300 group-hover:scale-[1.25] group-hover:!text-blue-500"
                      size={18}
                    />
                  )}
                </Link>

                {/* Dropdown menu */}
                {menu.children && (
                  <div
                    className={`fixed left-[0px] lg:w-[100vw] border-b lg:border-y border-dashed lg:border-solid border-dark-white lg:bg-white lg:opacity-0 lg:pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto duration-[400ms]  transition-all block py-2 px-2 pt-4 min-h-[30vh] `}
                  >
                    {menu.children && (
                      <ul className="w-full grid grid-cols-2 gap-4 ">
                        {menu?.children.map((child, idx) => (
                          <li
                            key={idx}
                            className="p-4 hover:bg-gray-50 text-gray-500 cursor-pointer transition-all duration-300 rounded-lg min-h-[5em] content-center font-semibold navbar-list-hover"
                          >
                            <div className=" flex flex-row justify-center items-center transition-all duration-300 hover-items">
                              <div className=" flex-[50%] place-items-end">
                                {child.icon ? child.icon : ""}
                              </div>
                              <div className="flex-[50%] text-start">
                                {child.display}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          
          </ul>
        </div>

        <div className="min-w-[10%] content-center pe-5 justify-items-end flex flex-row justify-end items-center relative z-[100]">
          {/* <div className=" w-fit text-gray-500 font-semibold  px-2 py-2 rounded-[50%] h-fit border-2 border-blue-500 hover:text-white  hover:bg-[linear-gradient(152deg,#bbcad7,#2196F3_42%,#0464b7)] transition-all duration-300 hover:text-[1.075em] ease-in-out cursor-pointer">
            <IoNotifications size={25} />
          </div> */}

          <ProfilePopover />
        </div>
      </div>
      <div className="min-h-[88vh] bg-gray-100 flex flex-col lg:grid lg:grid-cols-5 lg:grid-rows-5 ">
        <div className="bg-gray-100 dark:bg-black lg:col-span-4 lg:row-span-5 col-span-4 min-h-[88vh]  p-2">
  <Outlet />
</div>

        <div className="bg-gray-100 lg:row-span-5 lg:col-start-5 lg:block hidden p-2">
          <SideBarProfile />
        </div>
      </div>
    </>
  );
};

export default Navbar;
