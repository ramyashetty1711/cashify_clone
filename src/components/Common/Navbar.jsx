import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../../assets/Components/Footer/Footer";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const MenuData = [
    { display: "Home", link: "/" },
    { display: "Sell Phone", link: "/sell-phone" },
    { display: "Support", link: "/support" },
  ];

  const isActive = (link) =>
    link === "/" ? location.pathname === "/" : location.pathname.startsWith(link);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 flex items-center justify-between px-6 lg:px-8 py-3 transition-all duration-300 backdrop-blur-xl bg-white/50 dark:bg-gray-900/30 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-extrabold bg-gradient-to-r from-[var(--primary)] to-[var(--third)] text-transparent bg-clip-text hover:scale-105 transition-transform"
        >
          Logo
        </Link>

        {/* Center Menu */}
        <nav className="hidden lg:flex gap-6 absolute left-1/2 transform -translate-x-1/2">
          {MenuData.map((menu, idx) => (
            <Link
              key={idx}
              to={menu.link}
              className={`relative text-base font-medium transition-colors duration-200 ${
                isActive(menu.link)
                  ? "text-[var(--primary)]"
                  : "text-[var(--secondary)] hover:text-[var(--primary)]"
              }`}
            >
              {menu.display}
            </Link>
          ))}
        </nav>

        {/* Login + Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden lg:block px-4 py-1.5 rounded-lg font-medium bg-[var(--primary)] text-white hover:bg-[var(--third)] transition-all text-sm"
          >
            Login
          </Link>

          <button
            className="lg:hidden text-2xl text-[var(--primary)] hover:scale-110 transition-transform"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <RxCross2 /> : <GiHamburgerMenu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-2/3 max-w-sm bg-white dark:bg-gray-900 p-6 shadow-lg rounded-l-2xl flex flex-col gap-4 animate-slide-right">
            {MenuData.map((menu, idx) => (
              <Link
                key={idx}
                to={menu.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium text-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white transition"
              >
                {menu.display}
              </Link>
            ))}
            <Link
  to="/login"
  className="hidden lg:block px-5 py-2 rounded-full font-semibold bg-gradient-to-r from-[var(--primary)] to-[var(--third)] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm"
>
  Login
</Link>

          </div>
        </div>
      )}

      {/* Main Outlet */}
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 text-[var(--secondary)] dark:text-gray-300 text-center shadow-inner text-sm">
        <Footer />
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-right {
          animation: slideRight 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
