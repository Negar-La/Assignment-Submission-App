import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajax from "../Services/fetchService";

const Dashboard = ({ jwt }) => {
  // const [jwt, setJwt] = useLocalStrorage("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    ajax("api/assignments", "GET", jwt).then((assignmentsData) =>
      setAssignments(assignmentsData)
    );
  }, []);

  const createAssignmnet = () => {
    ajax("api/assignments", "POST", jwt).then((assignment) => {
      console.log(assignment);
      window.location.href = `assignments/${assignment.id}`;
    });
  };

  return (
    <div style={{ margin: "2em" }}>
      {assignments ? (
        assignments.map((assignemnt) => (
          <div key={assignemnt.id}>
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
