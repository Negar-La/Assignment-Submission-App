package com.demo.AssignmentSubmission.domain;


import jakarta.persistence.Entity;
import org.hibernate.sql.ast.tree.update.Assignment;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity (name = "users")
public class User {
    private long id;
    private LocalDate cohortStartDate;
    private String username;
    private String password;
    private List<Assignment> assignments = new ArrayList<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDate getCohortStartDate() {
        return cohortStartDate;
    }

    public void setCohortStartDate(LocalDate cohortStartDate) {
        this.cohortStartDate = cohortStartDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Assignment> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<Assignment> assignments) {
        this.assignments = assignments;
    }
}
