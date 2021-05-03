import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  loggedIn: false,
  serverCheck: false,
  error: null,
};

// async Thunk for getting user
export const getUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await fetch("/api/account/");
  console.log(response);
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    return Promise.reject(new Error(`${response.status} - ${response.statusText}`))
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logIn(state, action) {
      state.data = action.payload;
      state.loggedIn = true
    },
    logOut(state, action) {
        state.data = {};
        state.loggedIn = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        //not sure if we need this
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.serverCheck = false;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.data = {};
        state.loggedIn = false;
        state.serverCheck = true;
        state.error = action.payload;
      })
    },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;

export const selectUserLoggedIn = (state) => state.user.loggedIn;
export const selectUserData = (state) => state.user.data;
export const selectUserFromServer = (state) => state.user.serverCheck;

