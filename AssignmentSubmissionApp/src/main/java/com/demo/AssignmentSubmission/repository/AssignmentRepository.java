package com.demo.AssignmentSubmission.repository;

import com.demo.AssignmentSubmission.domain.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

}
