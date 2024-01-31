import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalStrorage } from "../util/useLocalStorage";

function AssignmentView() {
  const { id } = useParams();
  const [jwt, setJwt] = useLocalStrorage("", "jwt");
  const [assignment, setAssignment] = useState({
    branch: "",
    github_url: "",
  });

  const updateAssignment = (prop, value) => {
    // Create a shallow copy of the 'assignment' object using the spread operator (...).
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
    console.log(newAssignment);
  };

  const handleSubmit = () => {
    fetch(`/api/assignments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(assignment),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((assignmentData) => setAssignment(assignmentData));
  };

  useEffect(() => {
    fetch(`/api/assignments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((assignmentData) => setAssignment(assignmentData));
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
              value={assignment.github_url}
            />{" "}
          </h2>
          <h2>
            Branch:{" "}
            <input
              type="text"
              id="branch"
              onChange={(e) => updateAssignment("branch", e.target.value)}
              value={assignment.branch}
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
