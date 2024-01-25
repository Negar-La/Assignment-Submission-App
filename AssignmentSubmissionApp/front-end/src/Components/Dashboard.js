import React, { useEffect, useState } from "react";
import { useLocalStrorage } from "../util/useLocalStorage";
import { Link } from "react-router-dom";

const Dashboard = ({ jwt }) => {
  // const [jwt, setJwt] = useLocalStrorage("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    fetch("api/assignments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((responce) => {
        if (responce.status === 200) return responce.json();
      })
      .then((assignmentsData) => setAssignments(assignmentsData));
  }, []);

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
      .then((assignment) => {
        console.log(assignment);
        window.location.href = `assignments/${assignment.id}`;
      });
  };

  return (
    <div style={{ margin: "2em" }}>
      {assignments ? (
        assignments.map((assignemnt) => (
          <div>
            <Link to={`/assignments/${assignemnt.id}`}>
              Assignment ID: {assignemnt.id}
            </Link>{" "}
          </div>
        ))
      ) : (
        <></>
      )}

      <button onClick={() => createAssignmnet()}>Submit New Assignment</button>
    </div>
  );
};

export default Dashboard;
