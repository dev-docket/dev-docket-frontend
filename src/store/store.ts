import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

import taskSlice from "./slices/taskSlice";
import authSlice, { AuthState } from "./slices/authSlice";
import userSlice, { UserState } from "./slices/userSlice";
import projectSlice, { ProjectState } from "./slices/projectSlice";
import teamPageSlice from "./slices/teamPageSlice";
import teamSlice from "./slices/teamSlice";
import globalSettingsSlice from "./slices/globalSettingsSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage,
};

const projectPersistConfig = {
  key: "project",
  storage,
};

const authReducer = persistReducer<AuthState>(authPersistConfig, authSlice);
const userReducer = persistReducer<UserState>(userPersistConfig, userSlice);
const projectReducer = persistReducer<ProjectState>(
  projectPersistConfig,
  projectSlice,
);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,

    project: projectReducer,
    team: teamSlice,
    task: taskSlice,

    globalSettings: globalSettingsSlice,
    // projectPage: projectPageSlice,
    teamPage: teamPageSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
