import { createSlice } from "@reduxjs/toolkit";
import { TInitialState } from "./interface";

const initialState: TInitialState = {
  user: null,
  token: null,
  profile: null,
};

const authSlice = createSlice({
  name: "placeOrderSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});
export const { setUser, logOut, setProfile } = authSlice.actions;

export default authSlice.reducer;
