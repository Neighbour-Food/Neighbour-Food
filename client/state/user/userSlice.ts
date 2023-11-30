import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


interface UserState {
  isSignedIn: boolean,
  category: string,
  // formData: {
  // name: string,
  // paswword: string
  // }, // H E L P
  formData: any,
  loginData: any,
  address : string,
  orgName: string,
}

const initialState: UserState = {
  isSignedIn: false,
  category: 'NON-PROFIT',
  formData: {
    // name: '',
    // paswword: ''
  },
  loginData: {},
  address : '',
  orgName: "Very Good Org",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeIsSignedIn: (state) => {
      state.isSignedIn = !state.isSignedIn;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setFormData: (state, action: any) => {
      state.formData = action.payload;
    },
    setLoginData: (state, action: any) => {
      state.loginData = action.payload;
    },
    setAddress: (state, action: any) => {
      state.loginData = action.address;
    },
    setOrgName: (state, action: any) => {
      state.orgName = action.payload;
    },
  },
});

export const { changeIsSignedIn, setCategory, setFormData, setLoginData, setAddress, setOrgName } = userSlice.actions;

export default userSlice.reducer;


