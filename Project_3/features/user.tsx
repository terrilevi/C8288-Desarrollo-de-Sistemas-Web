import { createSlice } from "@reduxjs/toolkit"; 
// createslice allow us to create or reducer

const initialStateValue = {name: "", age: 0 , email: "", description: ""}

export const userSlice = createSlice({
    name: "user", // Nombre del slice, que representa el estado 'user'
    initialState: { 
        value: initialStateValue, 
        hasInfo: false,
        hasDescription : false,
        isInSafeX: false
    }, // Estado inicial
    reducers:{
        login: (state, action) => {
            state.value = action.payload;
            state.hasInfo = true;
        },

        logout: (state) => {
            state.value = initialStateValue;
            state.hasInfo = false;
            state.hasDescription = false;
            state.isInSafeX = false;
        },

        addingDescription: (state,action) => {
            state.value.description = action.payload;
            state.hasDescription = true;
        },

        enterSafeX: (state) =>{
            state.isInSafeX = true;
        }
    },
});



export const {login, logout, addingDescription, enterSafeX} = userSlice.actions
export default userSlice.reducer // Exportamos el reducer generado automáticamente por `createSlice`

