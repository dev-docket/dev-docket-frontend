import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import authSlice, { AuthState } from "./slices/authSlice";
import userSlice, { UserState } from "./slices/userSlice";
import projectSlice, { ProjectState } from "./slices/projectSlice";
import teamSlice from "./slices/teamSlice";
import taskSlice from "./slices/taskSlice";
import globalSettingsSlice from "./slices/globalSettingsSlice";
import teamPageSlice from "./slices/teamPageSlice";

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth', 'user', 'project'], // Only persist these reducers
//   timeout: 2000, // Increase timeout if needed
// };

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ['status', 'error'] // Don't persist these fields
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
const projectReducer = persistReducer<ProjectState>(projectPersistConfig, projectSlice);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
    team: teamSlice,
    task: taskSlice,
    globalSettings: globalSettingsSlice,
    teamPage: teamPageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;