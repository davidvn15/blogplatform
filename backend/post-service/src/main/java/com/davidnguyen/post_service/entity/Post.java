package com.davidnguyen.post_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.HashSet;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue
    private UUID id;

    private String title;

    @Column(unique = true, nullable = false)
    private String slug;

    private String excerpt;
    private String thumbnail;

    @Column(nullable = false, columnDefinition = "text")
    private String content;

    private String featuredImageUrl;
    private String status;
    private int views;

    private Integer readingTimeMinutes;
    private boolean isFeatured;

    private String metaTitle;
    private String metaDescription;

    @Column(name = "published_at")
    private Instant publishedAt;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToMany
    @JoinTable(name = "post_tags", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<PostView> postViews;

    @ElementCollection
    @CollectionTable(name = "post_likes", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "user_id")
    private Set<String> likes = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "post_saved", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "user_id")
    private Set<String> saved = new HashSet<>();

    @Column(name = "user_id")
    private String userId;

    public Set<String> getLikes() {
        return likes;
    }

    public Set<String> getSaved() {
        return saved;
    }

    public String getUserId() {
        return userId;
    }
}