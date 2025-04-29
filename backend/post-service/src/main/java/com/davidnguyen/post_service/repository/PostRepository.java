package com.davidnguyen.post_service.repository;

import com.davidnguyen.post_service.entity.Post;
import com.davidnguyen.post_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Integer> {
    List<Post> findByAuthor(User author);
}
