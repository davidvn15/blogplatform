package com.davidnguyen.post_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OffensiveCommentNotification {
    private UUID postId;
    private UUID commentId;
    private UUID authorId;
    private String commentContent;
    private String reason;
} 