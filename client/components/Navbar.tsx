import React, { ChangeEvent, FC, ReactHTMLElement } from "react";
import { useSelector, useDispatch } from "react-redux/";
import { RootState } from "../state/store";
import { changeIsSignedIn, setCategory } from "../state/user/userSlice";


const Navbar: FC = () => {
    const dispatch = useDispatch();

    const category = useSelector((state: RootState) => state.user.category);

    // function to switch between categories on click
    const handleCategory = (event: any) => { /// H E L P
        const newCategory = event.target.value;
        dispatch(setCategory(newCategory));
    };
    return (
        <>
            {category === 'NON-PROFIT'
                ?
                <nav>
                    <button type='button' value='NON-PROFIT' className="red" onClick={handleCategory}>NON-PROFIT</button>
                    <button type='button' value='RESTAURANT' onClick={handleCategory} >RESTAURANT</button>
                </nav>
                :
                <nav>
                    <button type='button' value='NON-PROFIT' onClick={handleCategory}>NON-PROFIT</button>
                    <button type='button' value='RESTAURANT' onClick={handleCategory} className="red">RESTAURANT</button>
                </nav>
            }
        </>
    )
};



export default Navbar;