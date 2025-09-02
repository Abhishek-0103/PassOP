import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-purple-700/60 text-white py-4 text-center border-t border-purple-600">
      <p className="text-sm">
        Made with ❤️ by <span className="text-white">Abhishek</span> | ©{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
