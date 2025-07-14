import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
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
    // { display: "Artice Management", link: "/artice-management" },
    // { display: "Basic Data", link: "/basic-data" },
    { display: "Report Management", link: "/report-management" },
    { display: "Admin Tools", link: "/admin-tools" },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navbar */}
      <div className="h-[70px] py-3 px-4 bg-white dark:bg-[#383838] flex justify-between items-center shadow z-10">
        {/* Logo */}
        <Link to={"/home"} className="flex items-center bg-gradient-to-r from-purple-200 to-purple-50 rounded-lg p-1">
          <img src={Logo} width={90} alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-4 items-center">
          <ul className="flex gap-3">
            {MenuData.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu.link}
                  className={`px-3 py-2 rounded-md font-semibold transition duration-200 ${
                    Location.pathname.includes(menu.link)
                      ? "text-purple-600 dark:text-purple-300 underline"
                      : "text-gray-600 dark:text-white hover:text-purple-700"
                  }`}
                >
                  {menu.display}
                  {menu.children && (
                    <TiArrowSortedDown className="ml-1 inline-block" size={16} />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Profile + Mobile Menu */}
        <div className="flex items-center gap-4">
          <ProfilePopover />
          <button
            className="lg:hidden text-2xl text-purple-700 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <RxCross2 /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#383838] px-4 py-4 shadow z-20">
          <ul className="flex flex-col gap-3">
            {MenuData.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium ${
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
      <div className="flex-grow grid lg:grid-cols-5 h-[calc(100vh-70px)] overflow-hidden">
        {/* Main content */}
        <div className="lg:col-span-4 bg-gray-100 dark:bg-[#2f2f2f] overflow-y-auto p-4">
          <Outlet />
        </div>

        {/* Optional Side Profile */}
        <div className="hidden lg:block lg:col-span-1 bg-gray-100 dark:bg-[#383838] overflow-y-auto p-4">
          <SideBarProfile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
