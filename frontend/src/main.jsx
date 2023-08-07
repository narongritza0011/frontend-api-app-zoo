import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import Profile from "./pages/users/Profile.jsx";
import HomeAdmin from "./pages/admins/Dashboard.jsx";
import Login from "./components/Login.jsx";
import HomeUser from "./pages/users/Home.jsx";

//ตั้งค่าเรียกใช้ redux
import { Provider } from "react-redux";
import { store } from "./store/store.js";

//เรียกใช้ เเละ สร้าง route
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Animals from "./pages/admins/animals/Animals";
import AddAnimals from "./pages/admins/animals/AddAnimals";
import DetailAnimals from "./pages/admins/animals/DetailAnimals";
import Stages from "./pages/admins/stages/Stages";
import AddStage from "./pages/admins/stages/AddStage";
import Seats from "./pages/admins/seats/Seats";

//สร้าง router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  //admin
  {
    path: "/admin/dashboard",
    element: <HomeAdmin />,
  },
  {
    path: "/admin/profile",
    element: <Profile />,
  },
  //manage animals
  {
    path: "/admin/animals",
    element: <Animals />,
  },
  {
    path: "/admin/animals/add",
    element: <AddAnimals />,
  },
  {
    path: "/admin/animals/:id",
    element: <DetailAnimals />,
  },

  //manage  Performance stage
  {
    path: "/admin/stages",
    element: <Stages />,
  },
  {
    path: "/admin/stages/add",
    element: <AddStage />,
  },

  //manage seats
  {
    path: "/admin/stages/seats/:id",
    element: <Seats />,
  },
  //user
  {
    path: "/user/home",
    element: <HomeUser />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* เเบบเก่า */}
    {/* <Provider store={store}>
      <App />
    </Provider> */}

    {/* เเบบใหม่ ใช้ route ร่วม */}
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
