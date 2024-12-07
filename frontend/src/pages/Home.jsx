import React from "react";
import homebg from "../assets/home.webp";
import { Link } from "react-router-dom";

const home = () => {
  return (
    <div>
      <div className="bg-[url('./assets/home.webp')] bg-[length:500px_700px] bg-center h-dvh pt-7 flex justify-between flex-col w-full">
        <h1 className="text-3xl ml-7 font-bold">Blitz</h1>
        <div className="bg-white py-4 pb-7 px-4">
          <h2 className="text-3xl font-bold">Get Started with Blitz</h2>
          <Link
            to="/login"
            className="flex items-centre justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default home;
