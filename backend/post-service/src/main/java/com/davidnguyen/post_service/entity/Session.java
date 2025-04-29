package com.davidnguyen.post_service.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.Setter;

import java.util.UUID;
import java.time.Instant;

@Entity
@Table(name = "sessions")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Session {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(unique = true, nullable = false)
    private String token;

    private String userAgent;
    private String ipAddress;

    @Column(name = "expires_at")
    private Instant expiresAt;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "last_active_at")
    private Instant lastActiveAt;
}
