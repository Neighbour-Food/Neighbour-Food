import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


interface UserState {
  isSignedIn: boolean,
  isLoading : boolean,
  createOrderTab : string,
  orderScreen: string,
  category: string,
  username: string,
  // formData: {
  // name: string,
  // paswword: string
  // }, // H E L P
  formData: any,
  loginData: any,
  address : string,
  imgFile : any
}

const initialState: UserState = {
  isSignedIn: false,
  isLoading : false,
  createOrderTab: 'entry',
  orderScreen: '',
  category: 'NON-PROFIT',
  username: '',
  formData: {
    // name: '',
    // paswword: ''
  },
  loginData: {},
  address : '',
  imgFile : undefined
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeIsSignedIn: (state) => {
      state.isSignedIn = !state.isSignedIn;
    },
    setIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setCreateOrderTab: (state, action) => {
      state.createOrderTab = action.payload;
    },
    setOrderScreen: (state, action) => {
      state.orderScreen = action.payload;
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
    setUsername: (state, action: any) => {
      state.loginData = action.username;
    },
    setImgFile: (state, action: any) => {
      state.imgFile = action.imgFile;
    },
  },
});

export const { changeIsSignedIn, setCategory, setFormData, setLoginData, setIsLoading, setUsername,setCreateOrderTab, setOrderScreen, setImgFile } = userSlice.actions;

export default userSlice.reducer;


