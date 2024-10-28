import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../index";
import { useDispatch } from "react-redux"; //modify value from the state
import {logout} from '../features/user'

function SafeXpaceVista() {
    const user = useSelector((state: RootState) => state.user.value);
    const dispatch =  useDispatch();
    const handleLogout = () => {
        // This will now clear user data and set isLoggedIn to false
        dispatch(logout());
    };
    return (
        <div>
            <div>
                <div>
                    <p>
                        <span>{user.name}</span>
                        <span> • </span>
                        <span>{user.email}</span>
                    </p>
                </div>

                
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default SafeXpaceVista;