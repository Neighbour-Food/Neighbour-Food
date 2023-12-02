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
  id: number,
  formData: any,
  loginData: any,
  address: string,
  imgFile: any,
  orderInput: any,
  orderData: OrderData[]
  orgName: string
}

const initialState: UserState = {
  isSignedIn: false,
  isLoading: false,
  createOrderTab: 'entry',
  orderScreen: '',
  category: 'NON-PROFIT',
  id: undefined,
  username: '',
  formData: {},
  loginData: {},
  address: '',
  imgFile: {},
  orderInput: {},
  orderData: [],
  orgName: "Very Good Org"
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
      state.loginData = action.payload;
    },
    setId: (state, action: any) => {
      state.id = action.payload;
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
    setOrgName: (state, action: any) => {
      state.orgName = action.payload;
    },
  },
});


export const { changeIsSignedIn, setCategory, setFormData, setLoginData, setIsLoading, setUsername, setCreateOrderTab, setOrderScreen, setImgFile, setOrderInput,setOrderData, setOrgName , setId} = userSlice.actions;

export default userSlice.reducer;


