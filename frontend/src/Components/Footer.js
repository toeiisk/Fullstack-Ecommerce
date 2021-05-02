import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer
        className="flex flex-wrap items-center justify-between p-8 m-auto"
        style={{ backgroundColor: '#323232' }}
      >
        <div className="container mx-auto flex flex-col flex-wrap items-center justify-between">
          <div className="flex mx-auto text-white font-Mitr text-center text-2sm">
            Copyright Pramekub © 2021
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
