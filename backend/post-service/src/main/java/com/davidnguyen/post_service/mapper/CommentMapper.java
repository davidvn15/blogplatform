package com.davidnguyen.post_service.mapper;

import com.davidnguyen.post_service.dto.CommentDto;
import com.davidnguyen.post_service.dto.UserDto;
import com.davidnguyen.post_service.entity.Comment;
import com.davidnguyen.post_service.service.UserApiClient;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
public class CommentMapper {

    private final UserApiClient userApiClient;

    public CommentMapper(UserApiClient userApiClient) {
        this.userApiClient = userApiClient;
    }

    public Comment toComment(CommentDto commentDto) {
        return Comment.builder()
                .content(commentDto.getContent())
                .status(commentDto.getStatus())
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .authorId(commentDto.getAuthorId())
                .build();
    }

    public CommentDto toCommentDto(Comment comment) {
        return CommentDto.builder()
                .id(comment.getId())
                .postId(comment.getPost().getId())
                .authorId(comment.getAuthorId())
                .parentCommentId(comment.getParent() != null ? comment.getParent().getId() : null)
                .content(comment.getContent())
                .status(comment.getStatus())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .likes(comment.getLikes().stream().map(userApiClient::findUserById).collect(Collectors.toSet()))
                .userDto(userApiClient.findUserById(comment.getAuthorId().toString()))
                .replies(comment.getReplies() != null ? 
                    comment.getReplies().stream().map(this::toCommentDto).collect(Collectors.toList()) : 
                    null)
                .build();
    }
}
