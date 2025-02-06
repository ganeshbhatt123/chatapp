import React, { lazy, Suspense, useEffect, useState } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Loader from "../Components/UI/Loader/Loader";
import { loginRoutes } from "./loginRoutes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/authSlice";

const LoginLayout = lazy(() =>
  import("../Components/Layout/LoginLayout/LoginLayout")
);
const LoginDashboard = lazy(() =>
  import("../Components/LoginDashboard/LoginDashboard")
);
const HomeLayout = lazy(() =>
  import("../Components/Layout/HomeLayout/HomeLayout")
);
const LoginPage = lazy(() => import("../Components/Auth/Login/LoginPage"));
const SignupPage = lazy(() => import("../Components/Auth/Signup/SignupPage"));
const AppLayout = lazy(() =>
  import("../Components/Layout/AppLayout/AppLayout")
);

const AppRoutes = () => {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<AppLayout />}>
            <Route index element={<HomeLayout />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>

          <Route path="/dashboard" element={<LoginLayout />}>
            <Route index element={<LoginDashboard />} />
            {loginRoutes?.map((route) => (
              <Route
                key={route?.id || route?.path}
                path={route?.path}
                element={
                  <Suspense fallback={<Loader />}>{route?.component}</Suspense>
                }
              />
            ))}
          </Route>

          <Route path="*" element={<h2>No Page Found</h2>} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default AppRoutes;
