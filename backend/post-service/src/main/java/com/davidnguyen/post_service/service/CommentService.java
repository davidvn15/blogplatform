package com.davidnguyen.post_service.service;

import com.davidnguyen.post_service.dto.CommentDto;
import com.davidnguyen.post_service.dto.OffensiveCommentNotification;
import com.davidnguyen.post_service.dto.UserDto;
import com.davidnguyen.post_service.entity.Comment;
import com.davidnguyen.post_service.entity.Post;
import com.davidnguyen.post_service.handler.exception.ResourceNoAccessException;
import com.davidnguyen.post_service.handler.exception.ResourceNotFoundException;
import com.davidnguyen.post_service.mapper.CommentMapper;
import com.davidnguyen.post_service.repository.CommentRepository;
import com.davidnguyen.post_service.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final PostRepository postRepository;
    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;
    private final UserApiClient userApiClient;
    private final KafkaNotificationService kafkaNotificationService;

    private static final List<String> OFFENSIVE_WORDS = Arrays.asList(
        "bad", "offensive", "inappropriate" // Add more offensive words as needed
    );

    public void createComment(UUID postId, List<CommentDto> requests, UUID authorId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with this id " + postId));

        List<Comment> comments = new ArrayList<>();
        requests.forEach(req -> {
            req.setAuthorId(authorId);
            req.setLikes(new HashSet<>());
            Comment comment = commentMapper.toComment(req);
            comments.add(comment);
            comment.setPost(post);

            if (containsOffensiveContent(req.getContent())) {
                OffensiveCommentNotification notification = new OffensiveCommentNotification(
                    postId,
                    comment.getId(),
                    authorId,
                    req.getContent(),
                    "Contains offensive language"
                );
                kafkaNotificationService.sendOffensiveCommentNotification(notification);
            }
        });

        postRepository.save(post);
        commentRepository.saveAll(comments);
    }

    public void updateComment(UUID commentId, CommentDto request, String userId) {
        Comment comment = approveIdentityAndReturnComment(commentId, userId);
        
        // Check for offensive content in updated comment
        if (containsOffensiveContent(request.getContent())) {
            OffensiveCommentNotification notification = new OffensiveCommentNotification(
                comment.getPost().getId(),
                commentId,
                comment.getAuthorId(),
                request.getContent(),
                "Contains offensive language"
            );
            kafkaNotificationService.sendOffensiveCommentNotification(notification);
        }
        
        comment.setContent(request.getContent());
        commentRepository.save(comment);
    }

    public void deleteComment(UUID commentId, String userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with this id " + commentId));

        UserDto apiUser = userApiClient.findUserById(userId);
        if (!comment.getAuthorId().toString().equals(userId) && !apiUser.getRoles().contains("ROLE_ADMIN")) {
            throw new ResourceNoAccessException("You have no access to this resource");
        }

        commentRepository.deleteById(commentId);
    }

    public void likeComment(UUID commentId, String userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with this id " + commentId));

        comment.getLikes().add(userId);
        commentRepository.save(comment);
    }

    public void unlikeComment(UUID commentId, String userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with this id " + commentId));

        comment.getLikes().remove(userId);
        commentRepository.save(comment);
    }

    private Comment approveIdentityAndReturnComment(UUID commentId, String userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with this id " + commentId));

        UserDto apiUser = userApiClient.findUserById(userId);

        if (!Objects.equals(comment.getAuthorId(), userId) && !apiUser.getRoles().contains("ROLE_ADMIN")) {
            throw new ResourceNoAccessException("You have no access to this resource");
        }

        return comment;
    }

    private boolean containsOffensiveContent(String content) {
        if (content == null || content.isEmpty()) {
            return false;
        }
        
        String lowerContent = content.toLowerCase();
        return OFFENSIVE_WORDS.stream()
                .anyMatch(word -> lowerContent.contains(word.toLowerCase()));
    }
}
