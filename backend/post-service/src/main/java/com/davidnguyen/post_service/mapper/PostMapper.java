package com.davidnguyen.post_service.mapper;

import com.davidnguyen.post_service.dto.PostReqDto;
import com.davidnguyen.post_service.dto.PostRespDto;
import com.davidnguyen.post_service.dto.UserDto;
import com.davidnguyen.post_service.entity.Post;
import com.davidnguyen.post_service.service.UserApiClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostMapper {

    private final UserApiClient userApiClient;
    private final CommentMapper commentMapper;

    public Post toPostEntity(PostReqDto postReqDto) {
        return Post.builder()
                .title(postReqDto.getTitle())
                .slug(postReqDto.getSlug())
                .excerpt(postReqDto.getExcerpt())
                .thumbnail(postReqDto.getThumbnail())
                .featuredImageUrl(postReqDto.getFeaturedImageUrl())
                .content(postReqDto.getContent())
                .status(postReqDto.getStatus())
                .readingTimeMinutes(postReqDto.getReadingTimeMinutes())
                .isFeatured(postReqDto.isFeatured())
                .metaTitle(postReqDto.getMetaTitle())
                .metaDescription(postReqDto.getMetaDescription())
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }

    public PostRespDto toPostRespDTO(Post post) {
        return PostRespDto.builder()
                .title(post.getTitle())
                .slug(post.getSlug())
                .excerpt(post.getExcerpt())
                .thumbnail(post.getThumbnail())
                .featuredImageUrl(post.getFeaturedImageUrl())
                .content(post.getContent())
                .status(post.getStatus())
                .readingTimeMinutes(post.getReadingTimeMinutes())
                .isFeatured(post.isFeatured())
                .metaTitle(post.getMetaTitle())
                .metaDescription(post.getMetaDescription())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .likes(post.getLikes().stream().map(userApiClient::findUserById).collect(Collectors.toSet()))
                .saved(post.getSaved().stream().map(userApiClient::findUserById).collect(Collectors.toSet()))
                .comments(post.getComments().stream().map(commentMapper::toCommentDto).collect(Collectors.toList()))
                .userDto(userApiClient.findUserById(post.getAuthor().getId().toString()))
                .build();
    }
}
