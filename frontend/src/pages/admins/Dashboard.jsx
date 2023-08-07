import React from "react";
import Nav from "../../components/Nav.jsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Nav />

      <div className="mx-auto px-10 mt-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          <div className="flex flex-col w-full border-opacity-50  ">
            <Link to="/admin/stages">
              <div className="grid h-20 card bg-base-300 rounded place-items-center cursor-pointer  hover:drop-shadow-lg">
                <h1>Manage Stage</h1>
              </div>
            </Link>
          </div>
          <div className="flex flex-col w-full border-opacity-50  ">
            <Link to="/admin/animals">
              <div className="grid h-20 card bg-base-300 rounded place-items-center cursor-pointer hover:drop-shadow-lg">
                <h1>Manage Animals</h1>
              </div>
            </Link>
          </div>
          <div className="flex flex-col w-full border-opacity-50  ">
            <div className="grid h-20 card bg-base-300 rounded place-items-center cursor-pointer hover:drop-shadow-lg">
              <h1>Manage Round to Show</h1>
            </div>
          </div>
          <div className="flex flex-col w-full border-opacity-50  ">
            <div className="grid h-20 card bg-base-300 rounded place-items-center cursor-pointer hover:drop-shadow-lg">
              <h1>scan QR </h1>
            </div>
          </div>
          <div className="flex flex-col w-full border-opacity-50  ">
            <div className="grid h-20 card bg-base-300 rounded place-items-center cursor-pointer hover:drop-shadow-lg">
              <h1>Orders</h1>
            </div>
          </div>
          <div className="flex flex-col w-full border-opacity-50  ">
            <div className="grid h-20 card bg-base-300 rounded place-items-center cursor-pointer hover:drop-shadow-lg">
              <h1>Seats</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
