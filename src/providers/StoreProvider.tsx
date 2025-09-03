"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </PersistGate>
    </Provider>
  );
}
