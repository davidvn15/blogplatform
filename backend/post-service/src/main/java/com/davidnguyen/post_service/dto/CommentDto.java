package com.davidnguyen.post_service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.util.Set;
import java.util.UUID;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    @JsonIgnore
    private UUID authorId;
    private String content;
    private Set<UserDto> likes;
    private UserDto userDto;
}
