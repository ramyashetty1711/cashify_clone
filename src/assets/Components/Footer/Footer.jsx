import React from "react";
import Logo from "../../../assets/Logo.png"; // your logo
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-t from-white via-[var(--third)]/10 to-white text-gray-700 pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div className="flex flex-col gap-5 text-start">
          <div className="flex items-center gap-2 text-2xl font-bold text-[var(--primary)]">
            {/* <img src={Logo} alt="Logo" className="w-32" /> */}
            Logo
          </div>
          <p className="text-gray-600 text-sm text-justify leading-relaxed">
            Sell, buy, and recycle your devices easily with our platform. Safe, fast, and reliable services for everyone.
          </p>
          <div className="flex gap-3 mt-2">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--primary)] hover:bg-[var(--third)] text-white transition-transform transform hover:scale-110"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4 text-start">
          <h3 className="text-[var(--primary)] font-semibold text-lg">Quick Links</h3>
          <ul className="flex flex-col gap-3">
            {["Home", "About Us", "Services", "Contact"].map((item, idx) => (
              <li key={idx}>
                <a
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-[var(--third)] transition-colors duration-300 text-sm"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-4 text-start">
          <h3 className="text-[var(--primary)] font-semibold text-lg">Support</h3>
          <ul className="flex flex-col gap-3">
            {["FAQs", "Return Policy", "Privacy Policy", "Terms & Conditions"].map((item, idx) => (
              <li key={idx}>
                <a
                  href="#"
                  className="hover:text-[var(--third)] transition-colors duration-300 text-sm"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / App */}
        <div className="flex flex-col gap-4 text-start">
          <h3 className="text-[var(--primary)] font-semibold text-lg">Contact</h3>
          <p className="text-gray-600 text-sm">
            Phone: +123 456 7890 <br /> Email: info@company.com
          </p>
          <div className="flex gap-3 mt-2">
            <a
              href="#"
              className="bg-[var(--primary)] hover:bg-[var(--third)] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              App Store
            </a>
            <a
              href="#"
              className="bg-[var(--primary)] hover:bg-[var(--third)] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Google Play
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-[var(--primary)] pt-6 text-center text-gray-500 text-sm">
        © 2025 Your Company. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
