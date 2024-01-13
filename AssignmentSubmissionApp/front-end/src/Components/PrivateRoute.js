import React from "react";
import { useLocalStrorage } from "../util/useLocalStorage";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [jwt] = useLocalStrorage("", "jwt");
  return jwt ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
