package com.davidnguyen.security_service.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@Builder
@ToString
public class ValidationResponse {
    private boolean isAuthenticated;
    private String username;
    private String token;
    private String id;
    private List<String> authorities;
}
