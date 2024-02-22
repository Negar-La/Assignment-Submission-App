import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStrorage } from '../util/useLocalStorage';
import ajax from '../Services/fetchService';
import { Form, Button, Col, Row, Container, Badge, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';

function AssignmentView() {
  const { id } = useParams();
  const [jwt, setJwt] = useLocalStrorage('', 'jwt');
  const [assignment, setAssignment] = useState({
    branch: '',
    github_url: '',
    name: null,
    status: null,
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStasuses, setAssignmentStatuses] = useState([]);

  const updateAssignment = (prop, value) => {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
    console.log(newAssignment);
  };

  const handleSubmit = () => {
    console.log(`status is ${assignment.status}`);
    //this implies that the student is submitting the assigment for the first time.
    if (assignment.status === assignmentStasuses[0].toString()) {
      updateAssignment('status', assignmentStasuses[1].toString());
      setAssignment((prevAssignment) => ({ ...prevAssignment, status: assignmentStasuses[1].toString() })); // Update status immediately in the state
    }
    ajax(`/api/assignments/${id}`, 'PUT', jwt, assignment).then((assignmentData) => {
      console.log(assignmentData);
      //setAssignment(assignmentData);
    });
  };

  useEffect(() => {
    ajax(`/api/assignments/${id}`, 'GET', jwt).then((assignmentResponse) => {
      //  console.log(assignmentResponse);
      let assignmentData = assignmentResponse.assignment;
      let assignmentEnums = assignmentResponse.assignmentEnums;
      let assignmentStasuses = assignmentResponse.statusEnums;
      setAssignment(assignmentData);
      setAssignmentEnums(assignmentEnums);
      setAssignmentStatuses(assignmentStasuses);
      // console.log(assignmentStasuses);
    });
  }, []);

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>{assignment.name ? <h3>Assignment {assignment.name}</h3> : <></>}</Col>
        <Col>
          <Badge bg="info" style={{ fontSize: '1em' }}>
            {' '}
            {assignment.status}
          </Badge>
        </Col>
      </Row>

      {assignment && assignmentEnums ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="assignmentName">
            <Form.Label column sm="3" md="2">
              Assignment:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                onSelect={(selectedElement) => {
                  updateAssignment('name', selectedElement);
                  console.log(assignment);
                }}
                as={ButtonGroup}
                variant="info"
                title={assignment.name ? `Assignment ${assignment.name}` : 'Select an Assignment'}
              >
                {assignmentEnums.map((assignmentEnum) => (
                  <Dropdown.Item key={assignmentEnum} eventKey={assignmentEnum}>
                    {assignmentEnum}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="my-3" controlId="github_url">
            <Form.Label column sm="3" md="2">
              Github URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control onChange={(e) => updateAssignment('github_url', e.target.value)} value={assignment.github_url || ''} type="url" placeholder="https//github/username/reponame" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="branch">
            <Form.Label column sm="3" md="2">
              Branch:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control type="text" onChange={(e) => updateAssignment('branch', e.target.value)} value={assignment.branch || ''} placeholder="main" />
            </Col>
          </Form.Group>

          <Button onClick={() => handleSubmit()}>Submit Assignment</Button>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default AssignmentView;
