import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalStrorage } from "../util/useLocalStorage";
import ajax from "../Services/fetchService";

function AssignmentView() {
  const { id } = useParams();
  const [jwt, setJwt] = useLocalStrorage("", "jwt");
  const [assignment, setAssignment] = useState({
    branch: "",
    github_url: "",
  });

  const updateAssignment = (prop, value) => {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
    console.log(newAssignment);
  };

  const handleSubmit = () => {
    ajax(`/api/assignments/${id}`, "PUT", jwt, assignment).then(
      (assignmentData) => setAssignment(assignmentData)
    );
  };

  useEffect(() => {
    ajax(`/api/assignments/${id}`, "GET", jwt).then((assignmentData) => {
      //  if (assignmentData.branch === null) assignmentData.branch = "";
      //  if (assignmentData.github_url === null) assignmentData.github_url = "";

      setAssignment(assignmentData);
    });
  }, []);

  return (
    <>
      <h2>Assignment {id} is here</h2>;
      {assignment ? (
        <>
          <h2>Status: {assignment.status} </h2>
          <h2>
            Github URL:{" "}
            <input
              type="url"
              id="github_url"
              onChange={(e) => updateAssignment("github_url", e.target.value)}
              value={assignment.github_url || ""}
            />{" "}
          </h2>
          <h2>
            Branch:{" "}
            <input
              type="text"
              id="branch"
              onChange={(e) => updateAssignment("branch", e.target.value)}
              value={assignment.branch || ""}
            />{" "}
          </h2>
          <button onClick={() => handleSubmit()}>Submit Assignment</button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default AssignmentView;
