import React, { useEffect, useState } from "react";
//redux  สำหรับส่งค่าไปเปลี่ยนใน store
import { useDispatch, useStore } from "react-redux";
import { logout, refresh, role } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
//ใช้ค่าจาก store
import { useSelector } from "react-redux";
import { URL_Local, configHeader } from "../services/api";
import axios from "axios";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userStore } = useSelector((state) => ({ ...state }));
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(refresh());
    if (userStore.user !== null) {
      setId(userStore.user._id);
      refreshRole();
    } else {
      navigate("/");
    }
  }, [id]);

  const refreshRole = async () => {
    if (id) {
      try {
        const response = await axios.post(
          `${URL_Local}/api/v1/refresh/token`,
          { id },
          configHeader
        );
        // console.log(response.data);

        // dispatch(login(response.data));
        dispatch(role(response.data.role));
        // if (response.data.role === "admin") {
        //   navigate("/admin/dashboard");
        // } else {
        //   navigate("/user/home");
        // }
      } catch (error) {
        console.error(error);
      }
    }
  };
  //   console.log(userStore.user);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <div className="navbar bg-base-100 drop-shadow-lg mb-20">
        <div className="flex-1">
          <Link
            to="/admin/dashboard"
            className="btn btn-ghost normal-case text-xl"
          >
            Navbar
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/admin/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>

              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
