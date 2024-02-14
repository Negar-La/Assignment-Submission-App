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
      console.log("assignment: ", assignment);
      window.location.href = `assignments/${assignment.id}`;
    });
  };

  return (
    <div style={{ margin: "2em" }}>
       <Button size="lg" className="mb-4" onClick={() => createAssignmnet()}>Submit New Assignment</Button> 
      {assignments ? (
        <div className="d-grid gap-5" style={{gridTemplateColumns: "repeat(auto-fill, 18rem)"}}>
          {assignments.map((assignemnt) => (
            <Card key={assignemnt.id} style={{ width: "18rem", height: "18rem" }}>
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>Assignment #{assignemnt.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {assignemnt.status}
                </Card.Subtitle>
                <Card.Text style={{ marginTop: "1em" }}>
                    <strong>Github URL:</strong> {assignemnt.github_url}
                </Card.Text>  
                <Card.Text>
                    <strong>Branch:</strong> {assignemnt.branch}
                </Card.Text>
                <Button variant="success"
                  onClick={() => {
                    window.location.href = `assignments/${assignemnt.id}`;
                  }}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div> 
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
