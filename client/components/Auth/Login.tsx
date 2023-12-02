import React, { ChangeEvent, FC, ReactHTMLElement } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux/";
import { RootState } from "../../state/store";
import { changeIsSignedIn, setCategory, setLoginData, setIsLoading, setUsername, setId } from "../../state/user/userSlice";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";


interface SuccessResponse {
  status: 'Success';
  // data: /* your specific data type */;
}

interface ErrorResponse {
  status: 'Denied';
  error: string;
}

type MyResponse = SuccessResponse | ErrorResponse;
const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Var for restaurant or NPO category
  const category = useSelector((state: RootState) => state.user.category);
  const loginData = useSelector((state: RootState) => state.user.loginData);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  //function to handle change and update state with redux
  const handleInputChange = (event: any) => { // H E L P
    const { name, value } = event.target
    // if (!loginData.category) {
    //   dispatch(setLoginData({
    //     ...loginData,
    //     category: category,
    //     [name]: value
    //   }))
    // } else {
      dispatch(setLoginData({
        ...loginData,
        [name]: value
      }))
    // }
  };

  //function to handle submit
  const handleSignUpSubmmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit: ', loginData)

    // POST REQUEST
    try {
      dispatch(setIsLoading());

      const request : any = await axios.post('http://localhost:4000/api/users/login', {
        loginData
      });

      if (request.data.status === 'success') {
        // console.log('request: ', request)
        dispatch(setUsername(request.data.username));
        dispatch(setId(request.data.id));
        if (category === 'NON_PROFIT') navigate("/feed")
        else navigate("/create-order")

        dispatch(setIsLoading());
        dispatch(changeIsSignedIn())
        // dispatch(setUsername(request.data.username));
        // dispatch(setId(request.data.Id));

      } else {
        alert('please enter all information')
      }

    }
    catch (err) {
      console.log('error: ', err)
    }
  };


  return (
    <>
      <div className="signup">
        <Sidebar />
        <section className="hero">
          <Navbar />
          <form onSubmit={handleSignUpSubmmit}>
            <h2>LOGIN TO <br></br>NEIGHBOUR FOOD</h2>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" onChange={handleInputChange} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleInputChange} />
            <p>Don’t have account yet? <span className="red"><a href="/signup">Sign Up</a></span></p>
            <button className="black-button" type="submit" >LOGIN</button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Login;
