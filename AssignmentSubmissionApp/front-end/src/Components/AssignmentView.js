import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalStrorage } from "../util/useLocalStorage";

function AssignmentView() {
  const { id } = useParams();
  const [jwt, setJwt] = useLocalStrorage("", "jwt");
  const [assignment, setAssignment] = useState(null);

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
            Github URL: <input type="url" id="githubUrl" />{" "}
          </h2>
          <h2>
            Branch: <input type="text" id="branch" />{" "}
          </h2>
          <button>Submit Assignment</button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default AssignmentView;
