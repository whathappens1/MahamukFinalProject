import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import './i18n';
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Settings from "./pages/settings";
import ChangeEmail from "./pages/settings/Email/ChangeEmail";
import ChangeUserName from "./pages/settings/UserName/ChangeUserName";
import ChangePassword from "./pages/settings/Password/ChangePassword";
import Status from "./pages/status";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Error from "./pages/error";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { DataProvider } from "./context/DataContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/YourAccount",
    element: <Settings />,
  },
  {
    path: "/YourAccount/Change_Email",
    element: <ChangeEmail />,
  },
  {
    path: "/YourAccount/Change_UserName",
    element: <ChangeUserName />,
  },
  {
    path: "/YourAccount/Change_Password",
    element: <ChangePassword />,
  },
  {
    path: "/Status/:id",
    element: <Status />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
