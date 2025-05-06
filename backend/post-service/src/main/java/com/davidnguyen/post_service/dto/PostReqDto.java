package com.davidnguyen.post_service.dto;

import lombok.*;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostReqDto {
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
    private UUID authorId;
    private UUID categoryId;
    private Set<UUID> tagIds;
}
