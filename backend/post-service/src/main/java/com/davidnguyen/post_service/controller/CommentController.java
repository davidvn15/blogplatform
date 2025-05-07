package com.davidnguyen.post_service.controller;

import com.davidnguyen.post_service.dto.CommentDto;
import com.davidnguyen.post_service.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping(ApiEndpoints.POST_COMMENTS)
    public ResponseEntity<?> createComment(
            @PathVariable(value = "postId") UUID postId,
            @RequestBody List<CommentDto> comments,
            @RequestHeader("authorId") UUID authorId
    ) {
        commentService.createComment(postId, comments, authorId);
        return ResponseEntity.status(HttpStatus.OK).body("Comment has been added");
    }

    @PutMapping(ApiEndpoints.COMMENT_DETAIL)
    public ResponseEntity<?> updateComment(
            @PathVariable(value = "commentId") UUID commentId,
            @RequestBody CommentDto commentDto,
            @RequestHeader("id") String userId
    ){
        commentService.updateComment(commentId,commentDto,userId);
        return ResponseEntity.status(HttpStatus.OK).body("Comment has been edited");
    }

    @DeleteMapping(ApiEndpoints.COMMENT_DETAIL)
    public ResponseEntity<?> deleteComment(
            @PathVariable(value = "commentId") UUID commentId,
            @RequestHeader("id") String userId
    ){
        commentService.deleteComment(commentId,userId);
        return ResponseEntity.status(HttpStatus.OK).body("Comment has been deleted");
    }


}
