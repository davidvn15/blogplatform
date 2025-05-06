package com.davidnguyen.post_service.repository;

import com.davidnguyen.post_service.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByAuthorId(UUID authorId);
    Optional<Comment> findById(Integer id);
}
