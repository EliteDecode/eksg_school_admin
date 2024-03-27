import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("SchoolAdminUser"));
const schoolStatus = JSON.parse(localStorage.getItem("school-status"));

const initialState = {
  user: user ? user : null,
  schoolStatus: schoolStatus ? schoolStatus : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

if (user) {
  initialState.user = user;
}

export const login = createAsyncThunk(
  "schoolAuthSlice/login",
  async (user, thunkAPI) => {
    try {
      const data = await authService.login(user);
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

export const getRegStatus = createAsyncThunk(
  "schoolAuthSlice/getRegStatus",
  async (_, thunkAPI) => {
    console.log("here");
    try {
      const token = thunkAPI.getState().schoolAuth.user.token;

      const data = await authService.getRegStatus(token);
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

export const register = createAsyncThunk(
  "schoolAuthSlice/register",
  async (schoolData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().schoolAuthSlice.user.token;
      const data = await authService.registerAdmin(token, schoolData);
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

export const updateAdmin = createAsyncThunk(
  "schoolAuthSlice/updateAdmin",
  async (schoolData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().schoolAuthSlice.user.token;
      const data = await authService.updateAdmin(token, schoolData);
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

export const logout = createAsyncThunk(
  "schoolAuthSlice/logout",
  async (_, thunkAPI) => {
    await authService.logout();
  }
);

const schoolAuthSlice = createSlice({
  name: "schoolAuthSlice",
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
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isSuccess = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "admin added";
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(updateAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "admin updated";
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })

      .addCase(getRegStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRegStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.schoolStatus = action.payload;
      })
      .addCase(getRegStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = schoolAuthSlice.actions;
export default schoolAuthSlice.reducer;
