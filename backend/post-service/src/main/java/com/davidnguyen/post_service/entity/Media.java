package com.davidnguyen.post_service.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;
import java.time.Instant;

@Entity
@Table(name = "media")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Media {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String filename;
    private String originalFilename;
    private String fileUrl;
    private String fileType;
    private String mimeType;
    private Integer fileSize;

    @Column(columnDefinition = "jsonb")
    private String dimensions;

    private String altText;
    private String caption;

    @Column(name = "uploaded_at")
    private Instant uploadedAt;
}
