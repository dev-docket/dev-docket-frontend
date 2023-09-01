import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

import taskSlice from "./slices/taskSlice";
import authSlice, { AuthState } from "./slices/authSlice";
import userSlice, { UserState } from "./slices/userSlice";
import projectPageSlice from "./slices/projectPageSlice";
import projectSlice from "./slices/projectSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage,
};

const authReducer = persistReducer<AuthState>(authPersistConfig, authSlice);
const userReducer = persistReducer<UserState>(userPersistConfig, userSlice);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    task: taskSlice,
    project: projectSlice,
    projectPage: projectPageSlice,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
