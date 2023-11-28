import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


interface UserState {
  isSignedIn: boolean;
  userName: string,
}

const initialState: UserState = {
  isSignedIn: false,
  userName: "Renee",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeIsSignedIn: (state) => {
      state.isSignedIn = !state.isSignedIn;
    },
    changeUserName: (state) => {
      state.userName = "Michael"
    },
    changeNameToAction : (state, action : PayloadAction<string>) => {
        state.userName = action.payload;
    } 
  },
});

export const { changeIsSignedIn, changeUserName, changeNameToAction } = userSlice.actions;

export default userSlice.reducer;
