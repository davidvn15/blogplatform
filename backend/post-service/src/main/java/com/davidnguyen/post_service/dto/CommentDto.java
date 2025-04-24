package com.davidnguyen.post_service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.util.Set;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    @JsonIgnore
    private String userId;
    private String content;
    private Set<UserDto> likes;
    private UserDto userDto;
}
