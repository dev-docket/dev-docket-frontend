import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

import taskSlice from "./slices/taskSlice";
import authSlice, { AuthState } from "./slices/authSlice";
import userSlice from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const authReducer = persistReducer<AuthState>(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    task: taskSlice,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
