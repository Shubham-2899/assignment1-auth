import React from "react";
import { Routes as CustomRoutes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import { ForgotPassword } from "./components/ForgotPassword";
import PageNotFound from "./components/PageNotFound";
import Products from "./components/Products/Products";
import Signin from "./components/SignupSignin/Signin";
import Signup from "./components/SignupSignin/Signup";
type Props = {};

const Routes = (props: Props) => {
  return (
    <>
      <CustomRoutes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/products" element={<Products />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/home" element={<MTable />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </CustomRoutes>
    </>
  );
};

export default Routes;
