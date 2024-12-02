import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default to localStorage for web
import { combineReducers } from "redux";
import userReducer from "./user/userSlice";
import themeReducer from './theme/themeSlice';

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable checks for non-serializable data
    }),
});

// Persistor
export const persistor = persistStore(store);
