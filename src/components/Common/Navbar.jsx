import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx"; // Close icon
import Logo from "../../assets/Logo.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import ProfilePopover from "./ProfilePopover";
import SideBarProfile from "./SideBarProfile";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const Location = useLocation();

  const MenuData = [
    { display: "Home", link: "/home" },
    { display: "SC Management", link: "/sc-management" },
    { display: "Work Order Management", link: "/workorder" },
    { display: "Service Management", link: "/service-management" },
    { display: "Spare Parts Management", link: "/spare-parts-management" },
    { display: "Device Management", link: "/device-management" },
    { display: "Artice Management", link: "/artice-management" },
    { display: "Basic Data", link: "/basic-data" },
    { display: "Report Management", link: "/report-management" },
    { display: "Admin Tools", link: "/admin-tools" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="h-fit py-3 w-full bg-white hover:shadow-lg dark:bg-[#383838] hover:shadow-purple-200 transition-all duration-500 flex flex-row justify-between items-center relative z-[100]">
        {/* Logo */}
        <Link
          className="mx-3 self-center flex flex-row bg-[linear-gradient(102deg,#eb77ff,#f0e3f3)] rounded-lg"
          to={"/home"}
        >
          <img src={Logo} width={90} alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex w-full lg:w-fit lg:h-full py-8 lg:py-0 px-5 lg:px-0 flex-col lg:flex-row items-center lg:gap-10">
          <ul className="flex">
            {MenuData.map((menu, index) => (
              <li
                key={index}
                className={`relative group w-full lg:w-fit h-fit lg:h-full p-1`}
              >
                <Link
                  to={menu.link}
                  className={`!bg-white group w-full focus:!outline-none !border-none lg:w-fit h-fit lg:h-full text-md px-1 py-2 hover:!border-none focus-within:!border-none not-hover:!border-none group-hover:!text-purple-600 dark:!bg-[#383838] transition-all duration-300 rounded-md font-[600] flex flex-row items-center ${
                    Location.pathname.includes(menu.link)
                      ? " !text-purple-600 dark:!text-purple-600 hover:!text-purple-700 text-xs"
                      : "!text-gray-600 text-xs dark:!text-white"
                  }`}
                >
                  {menu.display}
                  {menu.children && (
                    <TiArrowSortedDown
                      className="ms-2 group-hover:rotate-[180deg] transition-all duration-300 group-hover:scale-[1.25] group-hover:!text-blue-500"
                      size={18}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Profile + Hamburger Section (for all screens) */}
        <div className="flex items-center gap-4 pe-4 lg:pe-2">
          {/* ProfilePopover always visible */}
          <div>
            <ProfilePopover />
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="lg:hidden text-2xl text-purple-700 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <RxCross2 /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#383838] px-4 py-4 shadow-md z-40">
          <ul className="flex flex-col gap-3">
            {MenuData.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    Location.pathname.includes(menu.link)
                      ? "text-purple-700 dark:text-purple-300"
                      : "text-gray-800 dark:text-white hover:bg-purple-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {menu.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Layout */}
      <div className="min-h-[88vh] bg-gray-100 flex flex-col lg:grid lg:grid-cols-5 lg:grid-rows-5">
        <div className="bg-gray-100 dark:bg-[#383838] lg:col-span-4 lg:row-span-5 col-span-4 min-h-[88vh] p-2">
          <Outlet />
        </div>
        <div className="bg-gray-100 dark:bg-[#383838] lg:row-span-5 lg:col-start-5 lg:block hidden p-2">
          <SideBarProfile />
        </div>
      </div>
    </>
  );
};

export default Navbar;
