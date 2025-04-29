package com.davidnguyen.post_service.mapper;

import com.davidnguyen.post_service.dto.PostReqDto;
import com.davidnguyen.post_service.dto.PostRespDto;
import com.davidnguyen.post_service.dto.UserDto;
import com.davidnguyen.post_service.entity.Post;
import com.davidnguyen.post_service.service.UserApiClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostMapper {

    private final UserApiClient userApiClient;
    private final CommentMapper commentMapper;

    public Post toPostEntity(PostReqDto postReqDto) {
        return Post.builder()
                .title(postReqDto.getTitle())
                .authorId(postReqDto.getAuthorId())
                .thumbnail(postReqDto.getThumbnail())
                .content(postReqDto.getContent())
                .build();
    }

    public PostReqDto toPostRespDTO(Post post) {
        return PostRespDto.builder()
                .title(post.getTitle())
                .userId(post.getUserId())
                .thumbnail(post.getThumbnail())
                .content(post.getContent())
                .likes(post.getLikes().stream().map(userApiClient::findUserById).collect(Collectors.toSet()))
                .saved(post.getSaved().stream().map(userApiClient::findUserById).collect(Collectors.toSet()))
                .comments(post.getComments().stream().map(commentMapper::toCommentDto).collect(Collectors.toList()))
                .userDto(userApiClient.findUserById(post.getUserId()))
                .build();
    }
}
