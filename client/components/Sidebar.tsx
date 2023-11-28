import React, { ChangeEvent, FC, ReactHTMLElement } from "react";
import { useSelector, useDispatch } from "react-redux/";
import { RootState } from "../state/store";
import { changeIsSignedIn, setCategory, setFormData } from "../state/user/userSlice";


const Sidebar: FC = () => {
    const category = useSelector((state: RootState) => state.user.category);

    return (
        <>
            <section className={`side-bar ${category}`}>
                <p>Welcome</p>
                <h1>Neigbour Food</h1>
            </section>
        </>
    )
};



export default Sidebar;