package com.demo.AssignmentSubmission.enams;

import com.fasterxml.jackson.annotation.JsonFormat;

//@JsonFormat(shape = JsonFormat.Shape.OBJECT) //used for JSON parsing and generation as a JSON object
public enum AssignmentStatusEnum {
    PENDING_SUBMISSION,
    SUBMITTED,
    IN_REVIEW,
    NEEDS_UPDATE,
    COMPLETED
}
