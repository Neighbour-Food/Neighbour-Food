import React, { ChangeEvent, FC, ReactHTMLElement, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux/";
import { RootState } from "../../state/store";
import { changeIsSignedIn, setCategory, setFormData } from "../../state/user/userSlice";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Autocomplete from '../Autocomplete';


const Signup: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Var for restaurant or NPO category
  const category = useSelector((state: RootState) => state.user.category);
  const formData = useSelector((state: RootState) => state.user.formData);
  // console.log(formData)


  //function to handle change and update state with redux
  const handleInputChange = (event: any) => { // H E L P
    const { name, value } = event.target
    if (!formData.category) {
      dispatch(setFormData({
        ...formData,
        category: category,
        [name]: value
      }))
    } else {
      dispatch(setFormData({
        ...formData,
        [name]: value
      }))
    }
  };

  //function to handle submit
  const handleSignUpSubmmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit: ', formData)

    // POST REQUEST
    try {
      const request = await axios.post('http://localhost:4000/api/users/signup', {
        formData
      });

      if (request) { // request.status === 'success' // get user id // change signedin state to true
        console.log('request: ', request)
        if (category === 'NON_PROFIT') navigate("/feed")
        else navigate("/create-pickup")
      } // ELSE IS MISSING

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
            <h2>SIGN UP TO <br></br>NEIGHBOUR FOOD</h2>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" onChange={handleInputChange} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleInputChange} />
            <h3>CONTACT INFO</h3>
            <label htmlFor="org">Name of Org</label>
            <input type="text" name="org" onChange={handleInputChange} />
            <label htmlFor="contact">Contact Name</label>
            <input type="text" name="contact" onChange={handleInputChange} />
            <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={handleInputChange} />
            <label htmlFor="phone">Phone Number</label>
            <input type="text" name="phone" onChange={handleInputChange} />
            <label htmlFor="street">Street Adress</label>
            <Autocomplete />
            {category === 'NON-PROFIT' &&
              <>
                <label htmlFor="pickup">Pick Up Radius</label>
                <input type="text" name="pickup" onChange={handleInputChange} />
              </>
            }
            <button className="black-button" type="submit" >SIGN UP</button>
          </form>
        </section >
      </div>
    </>
  );
};

export default Signup;

