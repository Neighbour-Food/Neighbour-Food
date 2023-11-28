import React, { ChangeEvent, FC, ReactHTMLElement } from "react";
import { useSelector, useDispatch } from "react-redux/";
import { RootState } from "../../state/store";
import { changeIsSignedIn, changeUserName, changeNameToAction } from "../../state/user/userSlice";

const Signup: FC = () => {
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const userName = useSelector((state: RootState) => state.user.userName);
  
  const dispatch = useDispatch();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    dispatch(changeNameToAction(newName));
  };
  return (
    <div>
      <h1>{userName}</h1>
      <div>
        <button onClick={() => dispatch(changeIsSignedIn())}>
          change isSignedIn
        </button>
        <button onClick={() => dispatch(changeNameToAction('Julia'))}>
          change username
        </button>
        <input onChange={handleNameChange}></input>
      </div>
    </div>
  );
};

export default Signup;
