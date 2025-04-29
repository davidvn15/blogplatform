package com.davidnguyen.post_service.mapper;

import com.davidnguyen.post_service.dto.CommentDto;
import com.davidnguyen.post_service.dto.UserDto;
import com.davidnguyen.post_service.entity.Comment;
import com.davidnguyen.post_service.service.UserApiClient;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class CommentMapper {

    private final UserApiClient userApiClient;

    public CommentMapper(UserApiClient userApiClient) {
        this.userApiClient = userApiClient;
    }

    public Comment toComment(CommentDto commentDto) {
        return Comment.builder()
//                .userId(commentDto.getUserId())
                .content(commentDto.getContent())
//                .likes(commentDto.getLikes().stream().map(UserDto::getId).collect(Collectors.toSet()))
                .build();
    }

    public CommentDto toCommentDto(Comment comment) {
        return CommentDto.builder()
//                .userId(comment.getUserId())
                .content(comment.getContent())
//                .likes(comment.getLikes().stream().map(userApiClient::findUserById).collect(Collectors.toSet()))
//                .userDto(userApiClient.findUserById(comment.getUserId())) // Set the userDto field
                .build();
    }
}
