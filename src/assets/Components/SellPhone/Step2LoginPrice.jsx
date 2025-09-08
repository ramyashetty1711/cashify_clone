import React, { useState, useRef } from "react";

const Step2LoginPrice = ({ estimatedPrice, prevStep, nextStep }) => {
  const [mode, setMode] = useState(null); // "login" or "register"
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]); // store 4 digits separately

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleSendOtp = () => {
    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
    console.log("OTP sent to:", phone);
    setOtp(["", "", "", ""]); // reset OTP
    setOtpSent(true);
  };

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs[index + 1].current.focus(); // move to next box
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus(); // go back on delete
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp === "1234") {
      console.log("OTP Verified:", phone);
      nextStep();
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-[var(--primary)]">
        2. Estimated Price
      </h2>

      {/* Price Card */}
      <div className="flex flex-col gap-2 items-center p-6 rounded-2xl bg-gradient-to-r from-green-400 to-green-600 shadow-lg border border-green-500">
        <p className="font-semibold text-lg text-white">
          Your Device’s Estimated Price
        </p>
        <p className="text-4xl font-extrabold text-white drop-shadow-md">
          ₹{estimatedPrice}
        </p>
        <p className="text-sm text-white/90 mt-2">
          *Login/Register with phone number to unlock the{" "}
          <span className="font-semibold">exact price</span> of your device
        </p>
      </div>

      {/* CTA Buttons */}
      {!mode && (
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setMode("login")}
            className="bg-[var(--primary)] text-white px-6 py-2 rounded-xl hover:scale-105 transition"
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className="bg-[var(--third)] text-white px-6 py-2 rounded-xl hover:scale-105 transition"
          >
            Register
          </button>
        </div>
      )}

      {/* Phone + OTP Form */}
      {mode && (
        <form
          onSubmit={handleVerifyOtp}
          className="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-md text-left"
        >
          <h3 className="text-lg font-bold text-[var(--primary)] mb-2">
            {mode === "login" ? "Login" : "Register"} with Phone
          </h3>

          {/* Phone Input */}
          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            className="p-2 border rounded-md"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          {/* OTP Section */}
          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendOtp}
              className="bg-[var(--primary)] text-white py-2 rounded-lg hover:scale-105 transition"
            >
              Get OTP
            </button>
          ) : (
            <>
              <div className="flex justify-center gap-1">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength="1"
                    className="w-10 h-10 text-center text-lg font-bold border rounded-md"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>

              <div className="flex justify-between gap-4 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[var(--primary)] text-white py-2 rounded-lg hover:scale-105 transition"
                >
                  Verify
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:scale-105 transition"
                >
                  Regenerate
                </button>
              </div>
            </>
          )}
        </form>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 rounded-xl border border-[var(--third)] hover:bg-[var(--third)]/20 transition text-sm"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Step2LoginPrice;
