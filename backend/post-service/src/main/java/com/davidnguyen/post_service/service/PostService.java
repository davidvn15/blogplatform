package com.davidnguyen.post_service.service;

import com.davidnguyen.post_service.dto.CreateUpdatePostRequest;
import com.davidnguyen.post_service.dto.PostReqDto;
import com.davidnguyen.post_service.dto.PostRespDto;
import com.davidnguyen.post_service.dto.UserDto;
import com.davidnguyen.post_service.entity.Post;
import com.davidnguyen.post_service.handler.exception.ResourceNoAccessException;
import com.davidnguyen.post_service.handler.exception.ResourceNotFoundException;
import com.davidnguyen.post_service.mapper.PostMapper;
import com.davidnguyen.post_service.repository.PostRepository;
import com.davidnguyen.post_service.file.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostMapper postMapper;
    private final PostRepository postRepository;
    private final FileStorageService fileStorageService;
    private final UserApiClient userApiClient;

    public List<PostRespDto> getAllPosts() {
        return postRepository.findAll()
                .stream().map(postMapper::toPostRespDTO).toList();
    }

    public PostRespDto getPostById(UUID postId) {
        return postMapper.toPostRespDTO(postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with this id " + postId)));
    }

    public List<PostRespDto> getUserPosts(String userId) {
        List<Post> userPosts = postRepository.findByUserId(userId);
        return userPosts.stream().map(postMapper::toPostRespDTO).toList();
    }

    public List<PostRespDto> getUserSaved(String userId) {
        List<Post> allPosts = postRepository.findAll();
        List<Post> savedPosts = allPosts.stream()
                .filter(post -> post.getSaved().contains(userId))
                .toList();
        return savedPosts.stream()
                .map(postMapper::toPostRespDTO)
                .collect(Collectors.toList());
    }

    public Integer getSavedCount(UUID postId) {
        return Math.toIntExact(postRepository.findById(postId).stream().count());
    }

    @Transactional
    public void createPost(PostReqDto postRequest) {
        Post post = postMapper.toPostEntity(postRequest);
        postRepository.save(post);
    }

    @Transactional
    public void updatePost(UUID postId, CreateUpdatePostRequest request, String userId) {
        Post post = approveIdentityAndReturnPost(postId, userId);
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        postRepository.save(post);
    }

    public void uploadThumbnail(UUID postId, MultipartFile thumbnailFile, String userId) {
        Post post = approveIdentityAndReturnPost(postId, userId);
        String thumbnailPath = fileStorageService.saveFile(thumbnailFile);
        if (thumbnailPath == null) {
            throw new RuntimeException("Failed to save thumbnail");
        }
        post.setThumbnail(thumbnailPath);
        postRepository.save(post);
    }

    public void likePost(UUID postId, String userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with this id " + postId));
        post.getLikes().add(userId);
        postRepository.save(post);
    }

    public void unlikePost(UUID postId, String userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with this id " + postId));
        post.getLikes().remove(userId);
        postRepository.save(post);
    }

    public void savePost(UUID postId, String userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with this id " + postId));
        post.getSaved().add(userId);
        postRepository.save(post);
    }

    public void unsavePost(UUID postId, String userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with this id " + postId));
        post.getSaved().remove(userId);
        postRepository.save(post);
    }

    public void deletePost(UUID id, String userId) {
        approveIdentityAndReturnPost(id, userId);
        postRepository.deleteById(id);
    }

    private Post approveIdentityAndReturnPost(UUID postId, String userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with this id " + postId));

        UserDto apiUser = userApiClient.findUserById(userId);

        if (!Objects.equals(post.getUserId(), userId) && !apiUser.getRoles().contains("ROLE_ADMIN")) {
            throw new ResourceNoAccessException("You have no access to this resource");
        }

        return post;
    }
}
