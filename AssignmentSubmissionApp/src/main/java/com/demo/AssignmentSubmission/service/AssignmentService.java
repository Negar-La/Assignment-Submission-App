package com.demo.AssignmentSubmission.service;

import com.demo.AssignmentSubmission.domain.Assignment;
import com.demo.AssignmentSubmission.domain.User;
import com.demo.AssignmentSubmission.enams.AssignmentStatusEnum;
import com.demo.AssignmentSubmission.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepo;

    public Assignment createAssignment(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.name());
        assignment.setUser(user);

       return assignmentRepo.save(assignment); //.save will return the assignment

    }

    public Set<Assignment> findByUser(User user) {
        return assignmentRepo.findByUser(user);
    }


    public Optional<Assignment> findById(Long id) {
       return assignmentRepo.findById(id);
    }

    public Assignment updateAssignment(Assignment assignment) {
        return assignmentRepo.save(assignment);
    }
}
