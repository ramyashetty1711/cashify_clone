import React, { useState, useRef } from "react";

// Mock API calls
const checkPhoneExists = async (phone) => {
  await new Promise((res) => setTimeout(res, 500));
  const existingPhones = ["9876543210", "9123456789"];
  return existingPhones.includes(phone);
};

const sendOtpApi = async (phone) => {
  console.log("Sending OTP to", phone);
  await new Promise((res) => setTimeout(res, 500));
  return true;
};

const Step2LoginPrice = ({ estimatedPrice, prevStep, nextStep }) => {
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isExistingUser, setIsExistingUser] = useState(null);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handlePhoneSubmit = async () => {
    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
    const exists = await checkPhoneExists(phone);
    setIsExistingUser(exists);
    if (!exists) console.log(`Phone number ${phone} is not registered. Please register.`);
  };

  const handleSendOtp = async () => {
    if (!isExistingUser && (!fullName || !email)) {
      alert("Please enter your full name and email for registration");
      return;
    }
    await sendOtpApi(phone);
    setOtp(["", "", "", ""]);
    setOtpSent(true);
  };

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp === "1234") {
      console.log(isExistingUser ? "Login Success" : "Registration Success");
      nextStep();
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="flex flex-col gap-8 mx-auto px-4 text-center max-w-lg">
      {/* Estimated Price Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md w-full transition transform hover:scale-[1.02]">
        <p className="font-semibold text-lg">Your Device’s Estimated Price</p>
        <p className="text-3xl font-bold mt-2">₹{estimatedPrice}</p>
        <p className="text-sm mt-1">Login to know the exact price</p>
      </div>

      {/* Form Card */}
      <div className="max-w-lg mx-auto bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4 shadow-sm transition-all duration-300">
        {/* Phone Input */}
        {isExistingUser === null && (
          <>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={handlePhoneSubmit}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition w-full font-medium"
            >
              Continue
            </button>
          </>
        )}

        {/* Registration */}
        {isExistingUser === false && !otpSent && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg text-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </>
        )}

        {/* Send OTP */}
        {isExistingUser !== null && (
          <button
            onClick={handleSendOtp}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition w-full font-medium"
          >
            {otpSent
              ? "Resend OTP"
              : isExistingUser
              ? "Send OTP to Login"
              : "Send OTP to Register"}
          </button>
        )}

        {/* OTP Input */}
        {otpSent && (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-3 mt-4">
            <p className="font-medium text-blue-600">Enter OTP</p>
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition w-full font-medium"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>

      {/* Back Button */}
      <div className="flex justify-start w-full mt-2">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Step2LoginPrice;
