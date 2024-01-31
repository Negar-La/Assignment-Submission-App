package com.demo.AssignmentSubmission.web;

import com.demo.AssignmentSubmission.domain.Assignment;
import com.demo.AssignmentSubmission.domain.User;
import com.demo.AssignmentSubmission.repository.AssignmentRepository;
import com.demo.AssignmentSubmission.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController //class is a RESTful controller, and its methods are responsible for handling RESTful web service requests.
@RequestMapping("/api/assignments")  //@RequestMapping at the class level to specify the base URL path for all methods in the controller = sets the base path
public class AssignmentController {
    @Autowired
    private AssignmentService  assignmentService;
    // we need user info to create an assignment
   @PostMapping("")   //HTTP POST requests to "/api/assignments" will be handled by the createAssignment method
    public ResponseEntity <?> createAssignment(@AuthenticationPrincipal User user){
        Assignment newAssignment = assignmentService.createAssignment(user);
        return ResponseEntity.ok(newAssignment);
    }

    @GetMapping("")
    public ResponseEntity <?> getAssignments(@AuthenticationPrincipal User user){
       Set<Assignment> assignmentsByUser = assignmentService.findByUser(user);
       return ResponseEntity.ok(assignmentsByUser);
    }

    @GetMapping("{id}")
    public ResponseEntity <?> getAssignment(@PathVariable Long id, @AuthenticationPrincipal User user){
        Optional<Assignment> assignmentOpt = assignmentService.findById(id);
        return ResponseEntity.ok(assignmentOpt.orElse(new Assignment()));
    }

    @PutMapping("{id}")  //data that we're getting from the frontend : @RequestBody which is a representation of Assignment
    public ResponseEntity <?> updateAssignment(@PathVariable Long id,  @RequestBody Assignment assignment, @AuthenticationPrincipal User user){
       Assignment updatedAssignment = assignmentService.updateAssignment(assignment);
       return ResponseEntity.ok(updatedAssignment);
    }
}
