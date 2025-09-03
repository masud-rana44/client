import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./services/baseApi";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  cart: cartReducer,
});

const persistConfig = { key: "root", storage, whitelist: ["auth", "cart"] };
const persisted = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisted,
  middleware: (gDM) =>
    gDM({ serializableCheck: false }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
