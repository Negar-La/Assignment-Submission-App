import React from "react";
import { useLocalStrorage } from "../util/useLocalStorage";

const Dashboard = ({ jwt }) => {
  // const [jwt, setJwt] = useLocalStrorage("", "jwt");
  return (
    <div className="App">
      <h1>Hello World</h1>
      <h2>The value of JWT is {jwt} </h2>
    </div>
  );
};

export default Dashboard;
