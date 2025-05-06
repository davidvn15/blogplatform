package com.davidnguyen.post_service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostRespDto {
    private String title;
    private String slug;
    private String excerpt;
    private String thumbnail;
    private String featuredImageUrl;
    private String content;
    private String status;
    private Integer readingTimeMinutes;
    private boolean isFeatured;
    private String metaTitle;
    private String metaDescription;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant publishedAt;
    @JsonIgnore
    private String userId;
    private Set<UserDto> likes;
    private Set<UserDto> saved;
    private List<CommentDto> comments;
    private UserDto userDto;
}
