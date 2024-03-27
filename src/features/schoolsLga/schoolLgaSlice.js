import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "./schoolsLgaService";

const lgaSchools = JSON.parse(localStorage.getItem("lgaSchools"));
const allRawSchools = JSON.parse(localStorage.getItem("rawSchools"));

const initialState = {
  lgaSchools: lgaSchools ? lgaSchools : [],
  rawSchools: allRawSchools ? allRawSchools : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// if (students) {
//   initialState.students = students;
// }

export const getAllSchools = createAsyncThunk(
  "schoolsLga/getAllSchools",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().schoolAuth.user.token;
      const data = await service.getAllSchools(token);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAllRawSchools = createAsyncThunk(
  "schoolsLga/getAllRawSchools",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().schoolAuth.user.token;
      const data = await service.getAllRawSchools(token);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const schoolLgasSlice = createSlice({
  name: "schoolsLga",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSchools.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSchools.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.lgaSchools = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllSchools.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getAllRawSchools.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRawSchools.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.rawSchools = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllRawSchools.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = schoolLgasSlice.actions;
export default schoolLgasSlice.reducer;
