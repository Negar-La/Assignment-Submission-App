import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajax from "../Services/fetchService";
import { Button, Card } from "react-bootstrap";

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
          <Card key={assignemnt.id} style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Assignment #{assignemnt.id}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {assignemnt.status}
              </Card.Subtitle>
              <Card.Text style={{ marginTop: "1em" }}>
                <p>
                  <strong>Github URL:</strong> {assignemnt.github_url}
                </p>
                <p>
                  <strong>Branch:</strong> {assignemnt.branch}
                </p>
              </Card.Text>

              <Button
                onClick={() => {
                  window.location.href = `/assignments/${assignemnt.id}`;
                }}
              >
                Edit
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <></>
      )}

      <button onClick={() => createAssignmnet()}>Submit New Assignment</button>
    </div>
  );
};

export default Dashboard;
