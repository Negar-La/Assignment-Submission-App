package com.demo.AssignmentSubmission.domain;

import jakarta.persistence.*;

@Entity   //will create table called assignment (based on class name)
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String status;
    private String githubUrl;
    private String branch;
    private String codeReviewVideoUrl;
@ManyToOne(optional = false)
//the relationship is not optional. In other words, it's mandatory for each instance of the Assignment entity to be associated with a User entity.
    private User user;
// TODO:  create  private User assignedTo;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getCodeReviewVideoUrl() {
        return codeReviewVideoUrl;
    }

    public void setCodeReviewVideoUrl(String codeReviewVideoUrl) {
        this.codeReviewVideoUrl = codeReviewVideoUrl;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
