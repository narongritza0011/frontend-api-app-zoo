import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: [],
  role: "",
};

export const userSlice = createSlice({
  name: "userStore",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      // เข้าถึงค่าใน initialState เช่น ใช้ state.value
      // รับค่าเข้ามาใช้ action.payload
      state.user = action.payload;
      const formattedObject = JSON.stringify(action.payload);
      localStorage.setItem("user", formattedObject);
    },

    logout: (state) => {
      // เข้าถึงค่าใน initialState
      // เคลียค่าใน state
      state.user = null;
      state.role = "";
      localStorage.clear();
    },
    refresh: (state) => {
      const formattedObject = JSON.parse(localStorage.getItem("user"));
      // console.log(formattedObject);
      state.user = formattedObject;
    },
    role: (state, action) => {
      // const formattedObject = JSON.parse(localStorage.getItem("user"));
      // console.log(formattedObject);
      state.role = action.payload;
      // console.log(state.role);
    },
  },
});

//export ฟังชั่น ออกไปใช้
export const { login, logout, refresh, role } = userSlice.actions;
export default userSlice.reducer;
