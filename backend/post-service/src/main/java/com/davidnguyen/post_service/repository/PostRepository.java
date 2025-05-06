package com.davidnguyen.post_service.repository;

import com.davidnguyen.post_service.entity.Post;
import com.davidnguyen.post_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findByAuthor(User author);
    List<Post> findByUserId(String userId);
    Optional<Post> findById(Integer id);
}
