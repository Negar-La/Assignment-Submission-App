package com.demo.AssignmentSubmission.service;

import com.demo.AssignmentSubmission.domain.Assignment;
import com.demo.AssignmentSubmission.domain.User;
import com.demo.AssignmentSubmission.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepo;

    public Assignment createAssignment(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus("Needs to be submitted");
        assignment.setUser(user);

       return assignmentRepo.save(assignment); //.save will return the assignment

    }
}
