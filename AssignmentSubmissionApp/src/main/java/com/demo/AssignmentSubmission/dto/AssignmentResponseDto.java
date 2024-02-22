package com.demo.AssignmentSubmission.dto;

import com.demo.AssignmentSubmission.domain.Assignment;
import com.demo.AssignmentSubmission.enams.AssignmentEnum;
import com.demo.AssignmentSubmission.enams.AssignmentStatusEnum;

public class AssignmentResponseDto {
    //in AssignmentController for    @GetMapping("{id}") we are sending assignmentOpt to frontend
    //But because we wante to add more data to assignment (Enums), we create this DTO that represents this response
    private Assignment assignment;
    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
    private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();
    public AssignmentResponseDto(Assignment assignment) {
        this.assignment = assignment;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public AssignmentEnum[] getAssignmentEnums() {
        return assignmentEnums;
    }

    public AssignmentStatusEnum[] getStatusEnums() {
        return statusEnums;
    }
}
