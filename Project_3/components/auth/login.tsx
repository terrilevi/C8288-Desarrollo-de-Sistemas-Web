import React, { useState } from "react";
import { useDispatch } from "react-redux"; //modify value from the state
import {login} from '../../features/user'

function Login(){

    const dispatch =  useDispatch();

    //SECOND STEP
    const [name, setName] = useState<string>("");
    const [age,setAge]  = useState<number>(0);
    const [email, setEmail] = useState<string>("");                                                   
    

    // SECOND SETP
    //settling up our state handler

    const handleInputChange = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(login({
            name:name,
            age:age,
            email:email,
            description: ""
        }));
    };

    return (<div>     
        <h1> who are you? </h1>                
        <form onSubmit={handleInputChange}>
            <input
                type="text"
                name="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="i am ..."
            />
            <input
                type="string"
                name="age"
                value={age}
                onChange={(e)=>setAge(Number(e.target.value))}
                placeholder="my age is ..."
            />
            <input
                type="text"
                name="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="my email is..."
            />

            <button type= "submit"> continue </button>
        </form>
        
    </div>)
}

export default Login;