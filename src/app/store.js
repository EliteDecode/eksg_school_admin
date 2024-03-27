import { configureStore } from "@reduxjs/toolkit";
import schoolAuthSlice from "@/features/auth/authSlice";
import studentSlice from "@/features/students/studentSlice";
import schoolLgaSlice from "@/features/schoolsLga/schoolLgaSlice";
export const store = configureStore({
  reducer: {
    schoolAuth: schoolAuthSlice,
    students: studentSlice,
    schoolsLga: schoolLgaSlice,
  },
});
