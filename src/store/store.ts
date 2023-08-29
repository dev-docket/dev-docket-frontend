import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

import taskSlice from "./slices/taskSlice";
import authSlice, { AuthState } from "./slices/authSlice";
import { authApi } from "./slices/authApi";
import userSlice, { UserState } from "./slices/userSlice";
import projectPageSlice from "./slices/projectPageSlice";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authApiMiddleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(authApi.middleware);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // [authApi.reducerPath]: authApi.reducer,
    authApi: authApi.reducer,
    user: userReducer,
    task: taskSlice,
    projectPage: projectPageSlice,
  },
  middleware: (getDefaultMiddleware) => authApiMiddleware(getDefaultMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
