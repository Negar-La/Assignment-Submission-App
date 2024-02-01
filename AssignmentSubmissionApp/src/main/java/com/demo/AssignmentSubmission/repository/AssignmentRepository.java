package com.demo.AssignmentSubmission.repository;

import com.demo.AssignmentSubmission.domain.Assignment;
import com.demo.AssignmentSubmission.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;
import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

  Set<Assignment> findByUser(User user); //use set instead of list because it's a unique list.

}
