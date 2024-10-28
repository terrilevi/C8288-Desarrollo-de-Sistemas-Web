// me gustaria que este componente tenga, una descripcion que diga:
// who are you?
// luego este componente deberia debajo de ese titulo
// mostrar el name del user state, y a ladito como si fuera una oracion is..., o sea seria user.value.name is ...
// luego a lado de eso un form de nuevo en el cual pueda escribir info
// luego abajo un boton que diga yes,this is me.
// ahora lo que pasaria es que el user state tendria un description agregado


import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { RootState } from "../../index"; 
import { addingDescription } from "../../features/user";

function Description(){
    
    const dispatch = useDispatch();
    const user= useSelector((state:RootState)=> state.user.value)
    const [newDescription, setNewDescription] = useState("");

    const handleInputChange = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(addingDescription(newDescription));
    }
    
    
    return (
        <div>
            <h1> how do you perceive yourself? </h1>

            <div className="mb-4">
                <span className="text-lg">
                    {user.name} is... {user.description}
                </span>
            </div>

        <form onSubmit={handleInputChange}>
            <div>
                <input
                    type="text"
                    value={newDescription}
                    onChange={(e)=> setNewDescription(e.target.value)}
                    placeholder="a human being"
                />
            </div>
            <button
                type="submit"
            >  yes, this is me </button>
        </form>
        </div>



    )
}

export default Description;