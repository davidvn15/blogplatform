package com.davidnguyen.post_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "post_views")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostView {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String ipAddress;
    private String userAgent;
    private String referer;

    @Column(name = "viewed_at")
    private Instant viewedAt;
}
