import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux/";
import { RootState } from "../state/store";
import { useNavigate } from "react-router-dom";
import { setCategory } from "../state/user/userSlice";
import IMG1 from '../../assets/IMG1';
import IMG2 from '../../assets/IMG2';


const Main: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector((state: RootState) => state.user.category);

  const handleClick = (event: any) => {
    dispatch(setCategory(event.target.value));
    navigate("/signup")
  }
  return (
    <>
      <section className={`splash`}>
        <p>Welcome to</p>
        <h1>Neigbour <br></br>Food</h1>
        <h4>Together, let's turn surplus into support!</h4>
        <div>
          <button className="black-button" type="button" onClick={() => navigate("/signup")} >SIGNUP</button>
          <button className="black-button" type="button" onClick={() => navigate("/login")}>LOGIN</button>
        </div>
      </section>
      <section className="description">
        <div className="NON-PROFIT">
          <h2>FOR <br /><span className="red">RESTAURANT</span></h2>
          <p>Unlock the power of surplus goodness! Join our platform to connect with restaurants, and give your organization the opportunity to receive regular donations of excess food.</p>
          <button className="black-button" type="button" onClick={handleClick} value={'NON-PROFIT'}>JOIN NOW</button>
          <IMG1 />
        </div>
        <div className="RESTAURANT">
          <h2>FOR <br /><span className="red">NON-PROFIT</span></h2>
          <p>Elevate your impact and reduce food waste! Partner with us to seamlessly connect your restaurant with local non-profits, transforming surplus meals into a powerful force for good.</p>
          <button className="white-button" type="button" onClick={handleClick} value={'RESTAURANT'}>JOIN NOW</button>
          <IMG2 />
        </div>
      </section>
    </>
  );
};

export default Main;
