package com.davidnguyen.security_service.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.User;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
public class UserCreateRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private boolean isAccountLocked;
    private boolean enabled;
    private List<String> roles;
    private String token;
    private Set<User> followers;
    private Set<User> following;
}
