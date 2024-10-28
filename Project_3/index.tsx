import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux"; //provider to determine which components should be accesing
//to our store.
// we use the provider to wrap around our app.
import userReducer from "./features/user"  // Traemos `userReducer` (lo tamos llamando nosotros userReducer xd) para usarlo en el store
import postsReducer from "./features/posts"
const store = configureStore({
  // pass a collection of reducers
  // includes all the reducers that might be used in my application
  // we are creating a const store that holds the redux store created by configureStore
  // this configureSTORE is a function, so we call the function and passing argumnts, which is
  // an object literal. inside this object we are putting a property reducer which is also an object.
  // this object passed as an srguyment is used to confgure a consfigureStore
  reducer: {
    user:userReducer, // Asignamos `userReducer` al estado `user`
    posts: postsReducer
  }
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>
);

export type RootState = ReturnType<typeof store.getState>;
