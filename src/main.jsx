import "./index.css";
import "./App.css";
import React from "react";
import router from "./router.jsx";
import store from "@/redux/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
  // </React.StrictMode>
);
