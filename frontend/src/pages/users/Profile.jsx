import React from "react";
import Nav from "../../components/Nav.jsx";

const Profile = () => {
  return (
    <>
      <Nav />
      <div className="flex flex-col w-full border-opacity-50">
        <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
          <h1>Profile </h1>
        </div>

        <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
          <p>this is Profile page for user</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
