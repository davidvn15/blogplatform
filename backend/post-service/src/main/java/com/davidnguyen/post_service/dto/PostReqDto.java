package com.davidnguyen.post_service.dto;

import lombok.*;

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
    private UUID authorId;
    private String content;
    private UserDto userDto;
}
