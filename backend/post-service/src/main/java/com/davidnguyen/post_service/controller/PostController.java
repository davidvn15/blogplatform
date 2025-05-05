package com.davidnguyen.post_service.controller;

import com.davidnguyen.post_service.dto.CreateUpdatePostRequest;
import com.davidnguyen.post_service.dto.PostHelloDto;
import com.davidnguyen.post_service.dto.PostRespDto;
import com.davidnguyen.post_service.file.FileStorageService;
import com.davidnguyen.post_service.service.PostService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final FileStorageService fileStorageService;
    private final PostHelloDto sayhello;

    @GetMapping(ApiEndpoints.HEARTBEAT)
    public ResponseEntity<PostHelloDto> heartbeat(){
        return ResponseEntity.status(HttpStatus.OK).body(sayhello);
    }

    @GetMapping(ApiEndpoints.POSTS)
    public ResponseEntity<List<PostRespDto>> getAllPosts() {
        return ResponseEntity.status(HttpStatus.OK).body(postService.getAllPosts());
    }

    @GetMapping(ApiEndpoints.POST_DETAIL)
    public ResponseEntity<PostRespDto> getPostById(
            @PathVariable(value = "postId") Integer postId
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(postService.getPostById(postId));
    }

    @GetMapping(ApiEndpoints.USER_POSTS)
    public ResponseEntity<List<PostRespDto>> getUserPosts(
            @PathVariable(value = "userId") String userId
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(postService.getUserPosts(userId));
    }

    @GetMapping(ApiEndpoints.POST_SAVES_COUNT)
    public ResponseEntity<Integer> getPostSavedCount(
            @PathVariable(value = "postId") Integer postId
    ){
        return ResponseEntity.status(HttpStatus.OK).body(postService.getSavedCount(postId));
    }

    @GetMapping(ApiEndpoints.USER_SAVES)
    public ResponseEntity<List<PostRespDto>> getUserSaved(
            @PathVariable(value = "userId") String userId
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.getUserSaved(userId));
    }

    @PostMapping(value = ApiEndpoints.POSTS, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createPost(
            @RequestPart("thumbnail") @Valid MultipartFile thumbnail,
            @RequestParam("title") @NotNull @Size(max = 30, message = "Title must be less than 30 characters") String title,
            @RequestParam("content") @NotNull String content,
            @RequestHeader("authorId") UUID authorId
    ) {
        String thumbnailPath = fileStorageService.saveFile(thumbnail);
        if (thumbnailPath == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).
                    body("Failed to upload thumbnail");
        }

        postService.createPost(thumbnail, title,content, authorId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Post has been created");
    }

    @PutMapping(ApiEndpoints.POST_DETAIL)
    public ResponseEntity<?> updatePost(
            @PathVariable(value = "postId") Integer postId,
            @RequestBody @Valid CreateUpdatePostRequest updatePostRequest,
            @RequestHeader("id") String userId
    ) {
        postService.updatePost(postId, updatePostRequest, userId);
        return ResponseEntity.status(HttpStatus.OK).body("Post has been updated");
    }

    @PatchMapping(value = ApiEndpoints.POST_THUMBNAIL, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> uploadThumbnail(
            @PathVariable(value = "postId") Integer postId,
            @RequestPart("file") @Valid MultipartFile thumbnailFile,
            @RequestHeader("authorId") String authorId
    ) {
        postService.uploadThumbnail(postId, thumbnailFile, authorId);
        return ResponseEntity.status(HttpStatus.OK).body("New thumbnail added to post");
    }

    @PostMapping(ApiEndpoints.POST_LIKE)
    public ResponseEntity<?> likePost(
            @PathVariable(value = "postId") Integer postId,
            @RequestHeader("userId") String userId
    ) {
        postService.likeAndUnlikePost(postId, userId);
        return ResponseEntity.status(HttpStatus.OK).body("You liked this post");
    }

    @DeleteMapping(ApiEndpoints.POST_LIKE)
    public ResponseEntity<?> unlikePost(
            @PathVariable(value = "postId") Integer postId,
            @RequestHeader("userId") String userId
    ) {
        postService.likeAndUnlikePost(postId, userId);
        return ResponseEntity.status(HttpStatus.OK).body("You unliked this post");
    }

    @PostMapping(ApiEndpoints.POST_SAVE)
    public ResponseEntity<?> savePost(
            @PathVariable(value = "postId") Integer postId,
            @RequestHeader("userId") String userId
    ){
        postService.saveAndUnsavedPost(postId, userId);
        return ResponseEntity.status(HttpStatus.OK).body("You saved this post");
    }

    @DeleteMapping(ApiEndpoints.POST_SAVE)
    public ResponseEntity<?> unsavePost(
            @PathVariable(value = "postId") Integer postId,
            @RequestHeader("userId") String userId
    ){
        postService.saveAndUnsavedPost(postId, userId);
        return ResponseEntity.status(HttpStatus.OK).body("You unsaved this post");
    }

    @DeleteMapping(ApiEndpoints.POST_DETAIL)
    public ResponseEntity<?> deletePost(
            @PathVariable(value = "postId") Integer postId,
            @RequestHeader("id") String userId
    ) {
        postService.deletePost(postId, userId);
        return ResponseEntity.status(HttpStatus.OK).body("Post has been deleted");
    }

}
