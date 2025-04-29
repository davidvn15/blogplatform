package com.davidnguyen.post_service.controller;

import com.davidnguyen.post_service.dto.CreateUpdatePostRequest;
import com.davidnguyen.post_service.dto.PostReqDto;
import com.davidnguyen.post_service.dto.PostHelloDto;
import com.davidnguyen.post_service.file.FileStorageService;
import com.davidnguyen.post_service.service.PostService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final FileStorageService fileStorageService;
    private final PostHelloDto sayhello;

    @GetMapping(ApiEndpoints.POST_HEARTBEAT)
    public ResponseEntity<PostHelloDto> heartbeat(){
        return ResponseEntity.status(HttpStatus.OK).body(sayhello);
    }

    @GetMapping(ApiEndpoints.POST)
    public ResponseEntity<List<PostReqDto>> getAllPosts() {
        return ResponseEntity.status(HttpStatus.OK).body(postService.getAllPosts());
    }

    @GetMapping(ApiEndpoints.POST_DETAIL)
    public ResponseEntity<PostReqDto> getPostById(
            @PathVariable(value = "postId") Integer id
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(postService.getPostById(id));
    }

    @GetMapping(ApiEndpoints.POST_BY_USER)
    public ResponseEntity<List<PostReqDto>> getUserPosts(
            @PathVariable(value = "userId") String userId
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(postService.getUserPosts(userId));
    }

    @GetMapping("/get-post-saved-count/{postId}")
    public ResponseEntity<Integer> getPostSavedCount(
            @PathVariable(value = "postId") Integer postId
    ){
        return ResponseEntity.status(HttpStatus.OK).body(postService.getSavedCount(postId));
    }

    @GetMapping("/get-user-saved/{userId}")
    public ResponseEntity<List<PostReqDto>> getUserSaved(
            @PathVariable(value = "userId") String userId
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.getUserSaved(userId));
    }

    @PostMapping(value = ApiEndpoints.POST, consumes = {"multipart/form-data"})
    public ResponseEntity<?> createPost(
            @RequestPart("thumbnail") @Valid MultipartFile thumbnail,
            @RequestParam("title") @NotNull @Size(max = 30, message = "Title must be less than 30 characters") String title,
            @RequestParam("content") @NotNull String content,
            @RequestHeader("authorId") String authorId
    ) {
        String thumbnailPath = fileStorageService.saveFile(thumbnail);
        if (thumbnailPath == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).
                    body("Failed to upload thumbnail");
        }

        postService.createPost(thumbnail, title,content, authorId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Post has been created");
    }

    @PutMapping(ApiEndpoints.POST_UPDATE)
    public ResponseEntity<?> updatePost(
            @PathVariable(value = "postId") Integer postId,
            @RequestBody @Valid CreateUpdatePostRequest updatePostRequest,
            @RequestHeader("id") String userId
    ) {
        postService.updatePost(postId, updatePostRequest, userId);
        return ResponseEntity.status(HttpStatus.OK).body("Post has been updated");
    }

    @PatchMapping(value = "/upload-thumbnail/{postId}",consumes = {"multipart/form-data"})
    public ResponseEntity<?> uploadThumbnail(
            @PathVariable(value = "postId") Integer postId,
            @RequestPart("file") @Valid MultipartFile thumbnailFile,
            @RequestHeader("id") String userId
    ){
        postService.uploadThumbnail(postId,thumbnailFile,userId);
        return ResponseEntity.status(HttpStatus.OK).body("New thumbnail added to post");
    }

    @PatchMapping("/like-post/{postId}/{userId}")
    public ResponseEntity<?> likeAndUnlikePost(
            @PathVariable(value = "postId") Integer postId,
            @PathVariable(value = "userId") String userId
    ) {
        postService.likeAndUnlikePost(postId, userId);
        return ResponseEntity.status(HttpStatus.OK).body("You liked or unliked this post");
    }

    @PatchMapping("/save-post/{postId}/{userId}")
    public ResponseEntity<?> saveAndUnsavedPost(
            @PathVariable(value = "postId") Integer postId,
            @PathVariable(value = "userId") String userId
    ){
        postService.saveAndUnsavedPost(postId, userId);
        return ResponseEntity.status(HttpStatus.OK).body("You saved or unsaved this post");
    }

    @DeleteMapping("/delete-post/{id}")
    public ResponseEntity<?> deletePost(
            @PathVariable(value = "id") Integer id,
            @RequestHeader("id") String userId
    ) {
        postService.deletePost(id, userId);
        return ResponseEntity.status(HttpStatus.OK).body("Post has been deleted");
    }

}
