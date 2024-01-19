import React from "react";
import { useLocalStrorage } from "../util/useLocalStorage";

const Dashboard = ({ jwt }) => {
  // const [jwt, setJwt] = useLocalStrorage("", "jwt");
  const createAssignmnet = () => {
    fetch("api/assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((responce) => {
        if (responce.status === 200) return responce.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div style={{ margin: "2em" }}>
      <button onClick={() => createAssignmnet()}>Submit New Assignment</button>
    </div>
  );
};

export default Dashboard;
