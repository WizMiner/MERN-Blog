// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';  // Correct import of userReducer

export const store = configureStore({
  reducer: {
    user: userReducer,  // 'user' is the key that will store the user state in the store
  },
});
