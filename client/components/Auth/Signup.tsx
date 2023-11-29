import React, { ChangeEvent, FC, ReactHTMLElement} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux/";
import { RootState } from "../../state/store";
import { changeIsSignedIn, setCategory, setFormData } from "../../state/user/userSlice";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const Signup: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Array for all states to display as select options
  const states = ["", "AK - Alaska", "AL - Alabama", "AR - Arkansas", "AS - American Samoa", "AZ - Arizona", "CA - California", "CO - Colorado", "CT - Connecticut", "DC - District of Columbia", "DE - Delaware", "FL - Florida", "GA - Georgia", "GU - Guam", "HI - Hawaii", "IA - Iowa", "ID - Idaho", "IL - Illinois", "IN - Indiana", "KS - Kansas", "KY - Kentucky", "LA - Louisiana", "MA - Massachusetts", "MD - Maryland", "ME - Maine", "MI - Michigan", "MN - Minnesota", "MO - Missouri", "MS - Mississippi", "MT - Montana", "NC - North Carolina", "ND - North Dakota", "NE - Nebraska", "NH - New Hampshire", "NJ - New Jersey", "NM - New Mexico", "NV - Nevada", "NY - New York", "OH - Ohio", "OK - Oklahoma", "OR - Oregon", "PA - Pennsylvania", "PR - Puerto Rico", "RI - Rhode Island", "SC - South Carolina", "SD - South Dakota", "TN - Tennessee", "TX - Texas", "UT - Utah", "VA - Virginia", "VI - Virgin Islands", "VT - Vermont", "WA - Washington", "WI - Wisconsin", "WV - West Virginia", "WY - Wyoming"]

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
      const request = await axios.post('https://localhost:4000/signup', {
        formData
      });

      if (request) { // CHECK WITH BACKEND 
        if (category === 'NON_PROFIT') navigate("/feed")
        else navigate("/create-pickup")
      }

    }
    catch (err) {
      console.log('error: ', err)
    }
  };



  return (
    <>
      <div className="signup">
        {/* <Produce /> */}
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
            <div className="org-name">
              <div className="column">
                <label htmlFor="org">Name of Org</label>
                <input type="text" name="org" onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="contact">Contact Name</label>
                <input type="text" name="contact" onChange={handleInputChange} />
              </div>
            </div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={handleInputChange} />
            <label htmlFor="phone">Phone Number</label>
            <input type="text" name="phone" onChange={handleInputChange} />
            <label htmlFor="phone">Phone Number</label>
            <input type="text" name="phone" onChange={handleInputChange} />
            <label htmlFor="street">Street Adress</label>
            <input type="text" name="street" onChange={handleInputChange} />
            <div className="address">
              <div>
                <label htmlFor="city">City</label>
                <input type="text" name="city" onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="contact">State</label>
                <select className="state" name="state" onChange={handleInputChange}>
                  {states.map((state) => <option value={state} key={state}>{state}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="zip">Zip</label>
                <input type="text" name="zip" onChange={handleInputChange} />
              </div>
            </div>
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

