/// <reference types="vite/client" />

declare module "redux-persist/lib/storage" {
  export * from "redux-persist/es/storage";
  export { default } from "redux-persist/es/storage";
}
