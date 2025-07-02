import { useState } from "react";
import Logo from "../../assets/Logo.png";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import LoginIllustration from "../../assets/LoginIllustration.jpg";

// Background icon imports
import ChatIcon from "../../assets/Icons/Mail.svg";
import UserIcon from "../../assets/Icons/User.svg";
import ShieldIcon from "../../assets/Icons/Notification.svg";
import Lock from "../../assets/Icons/Lock.svg";
import calendar from "../../assets/Icons/calendar.svg";
import clipboard from "../../assets/Icons/clipboard.svg";

const icons = [ChatIcon, UserIcon, ShieldIcon, Lock, ChatIcon, UserIcon, ShieldIcon, calendar, clipboard ];

const Login = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();

  const HandleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Navigate("/home");
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#7e2b8f] via-[#8d409c] to-[#bababa] flex justify-center items-center px-4 py-2 overflow-hidden">
      
      {/* Floating Icons on Purple BG */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {icons.map((icon, index) => (
          <img
            key={index}
            src={icon}
            className="absolute w-8 h-8 opacity-50 animate-floating"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${index * 1.5}s`,
            }}
            alt={`icon-${index}`}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Image Section */}
        <div className="relative md:w-[50%] h-[300px] md:h-auto">
          <img
            src={LoginIllustration}
            alt="Login Illustration"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 z-0" />
          <div className="relative z-10 p-6 md:p-10 text-white flex flex-col justify-center h-full">
            <div className="bg-white w-fit rounded-2xl ps-2 mb-6">
              <img src={Logo} className="w-[7em] md:w-[8em]" alt="Logo" />
            </div>
            <div className="bg-black/70 p-5 rounded-lg mt-5">
              <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                Welcome to
                <br />
                <span className="bg-gradient-to-r text-5xl from-[#dc31ff] via-[#cd65e1] to-[#bababa] bg-clip-text text-transparent">
                  Switch Kart
                </span>
              </h2>
              <p className="text-sm md:text-base mt-2 text-gray-300 font-semibold">
                Switch to be better
              </p>
            </div>
          </div>
        </div>

        {/* Right Login Form Section */}
        <div className="md:w-[50%] w-full flex items-center justify-center p-6 md:p-10 bg-white">
          <div className="w-full max-w-md space-y-6">
            <div className="text-2xl font-semibold text-gray-700">Login</div>

            <div className="flex flex-col text-start">
              <label className="text-gray-500 text-base font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                className="bg-gray-200 py-2 px-4 rounded-xl text-gray-700 focus:outline-none"
                placeholder="Enter Username"
              />
            </div>

            <div className="flex flex-col text-start">
              <label className="text-gray-500 text-base font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="bg-gray-200 py-2 px-4 pr-10 rounded-xl text-gray-700 w-full focus:outline-none"
                  placeholder="Enter Password"
                />
                <FaEye
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-600 cursor-pointer"
                  size={18}
                />
              </div>
            </div>

            <button
              className={`w-full py-3 rounded-xl text-white font-medium transition mt-10 flex justify-center duration-300 ${
                IsLoading
                  ? "bg-gradient-to-r from-[#d644f3] to-[#7f2c90] opacity-60 cursor-progress"
                  : "bg-gradient-to-r from-[#d644f3] to-[#7f2c90] hover:from-[#e95aff] hover:to-[#6e1f82]"
              }`}
              disabled={IsLoading}
              onClick={HandleLogin}
            >
              {IsLoading ? (
                <SpinnerCircularFixed
                  size={23}
                  color="white"
                  speed={250}
                  thickness={250}
                />
              ) : (
                "Login"
              )}
            </button>

            <div className="text-center text-sm text-gray-500 font-medium pt-4">
              <hr className="mb-3 border-gray-300" />
              Need help in login?{" "}
              <span className="text-[#a600c8] hover:underline cursor-pointer">
                Contact Admin
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
