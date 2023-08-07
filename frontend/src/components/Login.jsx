import { useEffect, useState } from "react";

//redux  สำหรับส่งค่าไปเปลี่ยนใน store
import { useDispatch } from "react-redux";
import { login, role } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_Local, configHeader } from "../services/api";

//ใช้ค่าจาก store
import { useSelector } from "react-redux";
import { refresh } from "../store/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { userStore } = useSelector((state) => ({ ...state }));

  const formattedObject = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    // setUserLocal(formattedObject);
    // console.log(formattedObject);

    if (formattedObject !== null) {
      console.log(formattedObject);

      // dispatch(refresh());
      // setAdmin(userStore.user.role);
      if (formattedObject.role === "admin") {
        navigate("/admin/dashboard");
        console.log(formattedObject.role);
      } else if (formattedObject.role === "user") {
        navigate("/user/home");
        console.log(formattedObject.role);
      } else {
        navigate("/");
        console.log(formattedObject.role);
      }
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${URL_Local}/api/v1/login`,
        data,
        configHeader
      );

      dispatch(login(response.data));
      dispatch(role(response.data.role));
      if (response.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
        <form onSubmit={handleLogin}>
          {/* <!-- component --> */}
          <section className="flex w-[30rem] flex-col space-y-10">
            <div className="text-center text-4xl font-medium">Log In</div>

            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
              <input
                type="text"
                placeholder="Username"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                onChange={handleChange}
                name="email"
                value={data.email}
              />
            </div>

            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
              <input
                type="password"
                placeholder="Password"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                onChange={handleChange}
                value={data.password}
                name="password"
              />
            </div>

            <button
              type="submit"
              className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
            >
              LOG IN
            </button>
            <a className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300">
              FORGOT PASSWORD?
            </a>

            <p className="text-center text-lg">
              No account?
              <a className="font-medium text-indigo-500 underline-offset-4 hover:underline">
                Create One
              </a>
            </p>
          </section>
        </form>
      </main>
    </>
  );
};

export default Login;
