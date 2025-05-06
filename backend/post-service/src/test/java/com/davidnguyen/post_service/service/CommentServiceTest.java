package com.davidnguyen.post_service.service;

import com.davidnguyen.post_service.dto.CommentDto;
import com.davidnguyen.post_service.dto.UserDto;
import com.davidnguyen.post_service.entity.Comment;
import com.davidnguyen.post_service.entity.Post;
import com.davidnguyen.post_service.handler.exception.ResourceNoAccessException;
import com.davidnguyen.post_service.handler.exception.ResourceNotFoundException;
import com.davidnguyen.post_service.mapper.CommentMapper;
import com.davidnguyen.post_service.repository.CommentRepository;
import com.davidnguyen.post_service.repository.PostRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@DisplayName("Comment service test")
@ExtendWith(MockitoExtension.class)
public class CommentServiceTest {
    @Mock
    private PostRepository postRepository;
    @Mock
    private CommentMapper commentMapper;
    @Mock
    private CommentRepository commentRepository;
    @Mock
    private UserApiClient userApiClient;
    @InjectMocks
    private CommentService commentService;

    @Test
    void test_createComment() {
        // given
        UUID postId = UUID.randomUUID();
        UUID authorId = UUID.randomUUID();

        Post post = new Post();
        post.setId(postId);

        Comment comment = Comment.builder()
                .content("content")
                .authorId(authorId)
                .status("ACTIVE")
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        CommentDto commentDto = CommentDto.builder()
                .content("content")
                .status("ACTIVE")
                .build();

        List<CommentDto> commentDtos = Collections.singletonList(commentDto);

        // when
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(commentMapper.toComment(any(CommentDto.class))).thenReturn(comment);

        // then
        commentService.createComment(postId, commentDtos, authorId);

        // verify
        verify(postRepository).findById(postId);
        verify(commentMapper).toComment(any(CommentDto.class));
        verify(postRepository).save(post);
        verify(commentRepository).saveAll(anyList());
    }

    @Test
    void createComment_shouldThrowException_whenPostNotFoundWithGivenId() {
        // given
        UUID postId = UUID.randomUUID();
        UUID authorId = UUID.randomUUID();

        CommentDto commentDto = CommentDto.builder()
                .content("content")
                .status("ACTIVE")
                .build();

        List<CommentDto> commentDtos = Collections.singletonList(commentDto);

        // when
        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        // then
        Assertions.assertThatThrownBy(
                () -> commentService.createComment(postId, commentDtos, authorId)
        ).isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Post not found with this id ");

        verify(postRepository).findById(postId);
        verifyNoMoreInteractions(postRepository, commentMapper, commentRepository);
    }

    @Test
    void test_updateComment() {
        // given
        Integer commentId = 1;
        String userId = "i1";
        String newContent = "updated content";

        Comment comment = Comment.builder()
                .authorId(UUID.fromString(userId))
                .content("original content")
                .status("ACTIVE")
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        CommentDto commentDto = CommentDto.builder()
                .content(newContent)
                .status("ACTIVE")
                .build();

        UserDto userDto = UserDto.builder()
                .id(userId)
                .roles(List.of("ROLE_USER"))
                .build();

        // when
        when(commentRepository.findById(commentId)).thenReturn(Optional.of(comment));
        when(userApiClient.findUserById(userId)).thenReturn(userDto);

        // then
        commentService.updateComment(commentId, commentDto, userId);

        verify(commentRepository).findById(commentId);
        verify(userApiClient).findUserById(userId);
        verify(commentRepository).save(comment);
        assertEquals(newContent, comment.getContent());
    }

    @Test
    void test_updateComment_noAccess() {
        // given
        Integer commentId = 1;
        String userId = "i1";
        String anotherUserId = "i2";
        String newContent = "updated content";

        Comment comment = Comment.builder()
                .authorId(UUID.fromString(anotherUserId))
                .content("original content")
                .status("ACTIVE")
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        CommentDto commentDto = CommentDto.builder()
                .content(newContent)
                .status("ACTIVE")
                .build();

        UserDto userDto = UserDto.builder()
                .id(userId)
                .roles(List.of("ROLE_USER"))
                .build();

        // when
        when(commentRepository.findById(commentId)).thenReturn(Optional.of(comment));
        when(userApiClient.findUserById(userId)).thenReturn(userDto);

        // then
        assertThrows(ResourceNoAccessException.class, () -> {
            commentService.updateComment(commentId, commentDto, userId);
        });

        verify(commentRepository).findById(commentId);
        verify(userApiClient).findUserById(userId);
        verify(commentRepository, never()).save(any(Comment.class));
    }

    @Test
    void test_updateComment_notFound() {
        // given
        Integer commentId = 1;
        String userId = "i1";
        String newContent = "updated content";

        CommentDto commentDto = CommentDto.builder()
                .content(newContent)
                .status("ACTIVE")
                .build();

        // when
        when(commentRepository.findById(commentId)).thenReturn(Optional.empty());

        // then
        assertThrows(ResourceNotFoundException.class, () -> {
            commentService.updateComment(commentId, commentDto, userId);
        });

        verify(commentRepository).findById(commentId);
        verify(userApiClient, never()).findUserById(anyString());
        verify(commentRepository, never()).save(any(Comment.class));
    }

    @Test
    void test_deleteComment() {
        // given
        Integer commentId = 1;
        String userId = "i1";

        Comment comment = Comment.builder()
                .authorId(UUID.fromString(userId))
                .content("comment content")
                .status("ACTIVE")
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        UserDto apiUser = UserDto.builder()
                .id(userId)
                .roles(List.of("ROLE_ADMIN"))
                .build();

        // when
        when(commentRepository.findById(commentId)).thenReturn(Optional.of(comment));
        when(userApiClient.findUserById(userId)).thenReturn(apiUser);

        // then
        commentService.deleteComment(commentId, userId);

        verify(commentRepository).findById(commentId);
        verify(userApiClient).findUserById(userId);
        verify(commentRepository).deleteById(commentId);
    }

    @Test
    void test_deleteComment_noAccess() {
        // given
        Integer commentId = 1;
        String userId = "i1";
        String anotherUserId = "i2";

        Comment comment = Comment.builder()
                .authorId(UUID.fromString(anotherUserId))
                .content("original content")
                .status("ACTIVE")
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        UserDto userDto = UserDto.builder()
                .id(userId)
                .roles(List.of("ROLE_USER"))
                .build();

        // when
        when(commentRepository.findById(commentId)).thenReturn(Optional.of(comment));
        when(userApiClient.findUserById(userId)).thenReturn(userDto);

        // then
        assertThrows(ResourceNoAccessException.class, () -> {
            commentService.deleteComment(commentId, userId);
        });

        verify(commentRepository).findById(commentId);
        verify(userApiClient).findUserById(userId);
        verify(commentRepository, never()).deleteById(any());
    }

    @Test
    void test_deleteComment_notFound() {
        // given
        Integer commentId = 1;
        String userId = "i1";

        // when
        when(commentRepository.findById(commentId)).thenReturn(Optional.empty());

        // then
        assertThrows(ResourceNotFoundException.class, () -> {
            commentService.deleteComment(commentId, userId);
        });

        verify(commentRepository).findById(commentId);
        verify(userApiClient, never()).findUserById(anyString());
        verify(commentRepository, never()).deleteById(any());
    }

    @Test
    void test_likeComment() {
        // given
        Integer commentId = 1;
        String userId = "user1";

        Comment comment = Comment.builder()
                .id(UUID.randomUUID())
                .content("Test comment")
                .status("ACTIVE")
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .likes(new HashSet<>())
                .build();

        // when
        when(commentRepository.findById(commentId)).thenReturn(Optional.of(comment));
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);

        // then
        commentService.likeComment(commentId, userId);

        // verify
        verify(commentRepository).findById(commentId);
        verify(commentRepository).save(comment);
        assertTrue(comment.getLikes().contains(userId));
    }

    @Test
    void test_unlikeComment() {
        // given
        Integer commentId = 1;
        String userId = "user1";

        Comment comment = Comment.builder()
                .id(UUID.randomUUID())
                .content("Test comment")
                .status("ACTIVE")
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .likes(new HashSet<>(Collections.singletonList(userId)))
                .build();

        // when
        when(commentRepository.findById(commentId)).thenReturn(Optional.of(comment));
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);

        // then
        commentService.unlikeComment(commentId, userId);

        // verify
        verify(commentRepository).findById(commentId);
        verify(commentRepository).save(comment);
        assertFalse(comment.getLikes().contains(userId));
    }

    @Test
    void test_likeComment_notFound() {
        // given
        Integer commentId = 1;
        String userId = "user1";

        // when
        when(commentRepository.findById(commentId)).thenReturn(Optional.empty());

        // then
        assertThrows(ResourceNotFoundException.class, () -> {
            commentService.likeComment(commentId, userId);
        });

        verify(commentRepository).findById(commentId);
        verify(commentRepository, never()).save(any(Comment.class));
    }

    @Test
    void test_unlikeComment_notFound() {
        // given
        Integer commentId = 1;
        String userId = "user1";

        // when
        when(commentRepository.findById(commentId)).thenReturn(Optional.empty());

        // then
        assertThrows(ResourceNotFoundException.class, () -> {
            commentService.unlikeComment(commentId, userId);
        });

        verify(commentRepository).findById(commentId);
        verify(commentRepository, never()).save(any(Comment.class));
    }
}
