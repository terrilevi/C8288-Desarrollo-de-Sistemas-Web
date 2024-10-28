import React from "react";
import { useSelector, useDispatch } from "react-redux" // grab values from a state everytime we need to use it
import { RootState } from "../index"; 
import { enterSafeX } from "../features/user";

function Profile(){
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.value)

    return (
        <div>
        <div>
            <h1> people will now me as... </h1>
            <p> Name: {user.name}</p> 
            <p> Age: {user.age}</p> 
            <p> description: {user.description}</p>
        </div>
        <button
            onClick={()=> dispatch(enterSafeX())}
        >
            enter SafeXpace
        </button>
        </div>
    );
}

export default Profile;