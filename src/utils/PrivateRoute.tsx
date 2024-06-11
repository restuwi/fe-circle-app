import React from "react";
import { useAppSelector } from "../store";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }: any) => {
  const auth = useAppSelector((state) => state.auth);
  return (
    <Route {...rest}>{!auth.user ? <Navigate to="/login" /> : children}</Route>
  );
};

export default PrivateRoute;
