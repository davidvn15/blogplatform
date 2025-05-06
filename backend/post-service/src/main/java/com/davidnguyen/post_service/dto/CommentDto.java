package com.davidnguyen.post_service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    private UUID id;
    private UUID postId;
    private UUID authorId;
    private UUID parentCommentId;
    private String content;
    private String status;
    private Instant createdAt;
    private Instant updatedAt;
    private Set<UserDto> likes;
    private UserDto userDto;
    private List<CommentDto> replies;
}
