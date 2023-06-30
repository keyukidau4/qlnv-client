import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./type";
import { RootState } from "..";
import axios from "axios";
import { toast } from "react-toastify";

interface UserState {
  user: UserType | null;
}

// export interface UserStateInterface {
//   loading: boolean;
//   user: UserType | null;
//   error: string | undefined;
// }

const initialState: UserState = {
  user: null,
};

// export const fetchUsers = createAsyncThunk("http://localhost:8080/auth", () => {
//   const res = axios.get("");
//   return res;
// });

export const userSlice = createSlice({
  initialState,
  name: "user",

  // extraReducers: (builder) => {
  //   builder.addCase(fetchUsers.pending, (state) => {
  //     state.loading = true;
  //   });
  //   builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<Array<User>>) => {
  //     state.loading = false;
  //     state.users = action.payload;
  //   });
  //   builder.addCase(fetchUsers.rejected, (state, action) => {
  //     state.loading = false;
  //     state.users = [];
  //     state.error = action.error.message;
  //   });
  // },

  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      localStorage.setItem("user-info", JSON.stringify(action.payload));
    },
    // login: (state, action: PayloadAction<UserType>) => {

    // },
  },
});

const { logout, setUser } = userSlice.actions;

export const userSelector = (state: RootState) => state.userReducer;

export { logout, setUser };

export default userSlice.reducer;
