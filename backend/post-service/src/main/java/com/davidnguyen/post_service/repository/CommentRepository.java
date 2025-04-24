package com.davidnguyen.post_service.repository;

import com.davidnguyen.post_service.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
