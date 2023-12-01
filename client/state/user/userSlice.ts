import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface OrderData {
  pickUpTime: number;
  foodItem : string;
  nstructions: string;
}

interface UserState {
  isSignedIn: boolean,
  isLoading: boolean,
  createOrderTab: string,
  orderScreen: string,
  category: string,
  username: string,
  formData: any,
  loginData: any,
  address: string,
  imgFile: any,
  orderInput: any,
  orderData: OrderData[]
}

const initialState: UserState = {
  isSignedIn: false,
  isLoading: false,
  createOrderTab: 'entry',
  orderScreen: '',
  category: 'NON-PROFIT',
  username: '',
  formData: {},
  loginData: {},
  address: '',
  imgFile: undefined,
  orderInput: {},
  orderData: []
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
    setOrderInput: (state, action: any) => {
      state.orderInput = action.payload;
    },
    setOrderData: (state, action: PayloadAction<OrderData[]>) => {
      state.orderData = action.payload;
    },
  },
});

export const { changeIsSignedIn, setCategory, setFormData, setLoginData, setIsLoading, setUsername, setCreateOrderTab, setOrderScreen, setImgFile, setOrderInput,setOrderData } = userSlice.actions;

export default userSlice.reducer;


