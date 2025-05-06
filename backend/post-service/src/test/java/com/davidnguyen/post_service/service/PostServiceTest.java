package com.davidnguyen.post_service.service;

import com.davidnguyen.post_service.dto.CreateUpdatePostRequest;
import com.davidnguyen.post_service.dto.PostReqDto;
import com.davidnguyen.post_service.dto.PostRespDto;
import com.davidnguyen.post_service.dto.UserDto;
import com.davidnguyen.post_service.entity.Post;
import com.davidnguyen.post_service.file.FileStorageService;
import com.davidnguyen.post_service.handler.exception.ResourceNoAccessException;
import com.davidnguyen.post_service.handler.exception.ResourceNotFoundException;
import com.davidnguyen.post_service.mapper.PostMapper;
import com.davidnguyen.post_service.repository.PostRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.*;

@DisplayName("User service test")
@ExtendWith(MockitoExtension.class)
public class PostServiceTest {
    @Mock
    private  PostMapper postMapper;
    @Mock
    private  PostRepository postRepository;
    @Mock
    private  FileStorageService fileStorageService;
    @Mock
    private  UserApiClient userApiClient;
    @InjectMocks
    private PostService postService;

    @DisplayName("get all post successfully")
    @Test
    void test_getAllPosts() {
        // given
        Post post1 = new Post();
        post1.setId(UUID.randomUUID());
        post1.setContent("post1");

        Post post2 = new Post();
        post2.setId(UUID.randomUUID());
        post2.setContent("post2");

        List<Post> postList = new ArrayList<>() {{
            add(post1);
            add(post2);
        }};

        PostRespDto postRespDto1 = new PostRespDto();
        postRespDto1.setContent("post1");

        PostRespDto postRespDto2 = new PostRespDto();
        postRespDto2.setContent("post2");

        List<PostRespDto> postRespDtoList = new ArrayList<>() {{
            add(postRespDto1);
            add(postRespDto2);
        }};

        // when
        when(postRepository.findAll()).thenReturn(postList);
        when(postMapper.toPostRespDTO(post1)).thenReturn(postRespDto1);
        when(postMapper.toPostRespDTO(post2)).thenReturn(postRespDto2);

        // then
        List<PostRespDto> resultList = postService.getAllPosts();

        assertEquals(resultList, postRespDtoList);

        // verify
        verify(postRepository).findAll();
        verifyNoMoreInteractions(postRepository);
    }

    @DisplayName("get post by id successfully")
    @Test
    void test_getPostById() {
        // given
        UUID id = UUID.randomUUID();

        Post post = new Post();
        post.setId(id);
        post.setContent("post1");

        PostRespDto postRespDto = new PostRespDto();
        postRespDto.setContent("postdto1");

        // when
        when(postRepository.findById(id)).thenReturn(Optional.of(post));
        when(postMapper.toPostRespDTO(post)).thenReturn(postRespDto);

        // then
        PostRespDto result = postService.getPostById(id);

        assertEquals(result, postRespDto);

        // verify
        verify(postRepository).findById(id);
        verifyNoMoreInteractions(postRepository);
    }

    @DisplayName("should throw exception when post not found with given id")
    @Test
    void getPostById_shouldThrowException_whenPostNotFoundWithGivenId() {
        // given
        UUID id = UUID.randomUUID();

        // when
        when(postRepository.findById(id)).thenReturn(Optional.empty());

        // then
        assertThrows(ResourceNotFoundException.class, () -> postService.getPostById(id));
        verify(postRepository).findById(id);
        verifyNoMoreInteractions(postRepository);
    }

    @DisplayName("get user post successfully")
    @Test
    void test_getUserPosts() {
        // given
        String userId = "i1";

        Post post1 = new Post();
        post1.setId(UUID.randomUUID());
        post1.setContent("post1");
        post1.setUserId("i1");

        Post post2 = new Post();
        post2.setId(UUID.randomUUID());
        post2.setContent("post2");
        post2.setUserId("i1");

        List<Post> postList = new ArrayList<>() {{
            add(post1);
            add(post2);
        }};

        PostRespDto postRespDto1 = new PostRespDto();
        postRespDto1.setContent("postDto1");
        postRespDto1.setUserId("i1");

        PostRespDto postRespDto2 = new PostRespDto();
        postRespDto2.setContent("postDto2");
        postRespDto2.setUserId("i1");

        List<PostRespDto> postRespDtoList = new ArrayList<>() {{
            add(postRespDto1);
            add(postRespDto2);
        }};

        // when
        when(postRepository.findByUserId(userId)).thenReturn(postList);
        when(postMapper.toPostRespDTO(post1)).thenReturn(postRespDto1);
        when(postMapper.toPostRespDTO(post2)).thenReturn(postRespDto2);

        // then
        List<PostRespDto> result = postService.getUserPosts(userId);

        assertEquals(result, postRespDtoList);

        // verify
        verify(postRepository).findByUserId(userId);
        verify(postMapper).toPostRespDTO(post1);
        verify(postMapper).toPostRespDTO(post2);
        verifyNoMoreInteractions(postRepository, postMapper);
    }

    @DisplayName("get user saved successfully")
    @Test
    void test_getUserSaved() {
        // given
        String userId = "i1";

        Post post1 = new Post();
        post1.setContent("post1");
        post1.setUserId("i1");
        post1.setSaved(Set.of("i1"));

        Post post2 = new Post();
        post2.setContent("post2");
        post2.setUserId("i2");
        post2.setSaved(Set.of("i2"));

        List<Post> postList = new ArrayList<>() {{
            add(post1);
            add(post2);
        }};

        PostRespDto postRespDto1 = new PostRespDto();
        postRespDto1.setContent("postDto1");
        postRespDto1.setUserId("i1");

        PostRespDto postRespDto2 = new PostRespDto();
        postRespDto2.setContent("postDto2");
        postRespDto2.setUserId("i2");

        List<PostRespDto> postRespDtoList = new ArrayList<>() {{
            add(postRespDto1);
        }};

        // when
        when(postRepository.findAll()).thenReturn(postList);
        when(postMapper.toPostRespDTO(post1)).thenReturn(postRespDto1);

        // then
        List<PostRespDto> result = postService.getUserSaved(userId);

        assertEquals(result.size(), 1);

        // verify
        verify(postRepository).findAll();
        verify(postMapper).toPostRespDTO(post1);
        verifyNoMoreInteractions(postRepository, postMapper);
    }

    @DisplayName("get saved count")
    @Test
    void test_getSavedCount(){
        //given
        UUID id = UUID.randomUUID();

        Post post = new Post();
        post.setContent("post1");

        //when
        when(postRepository.findById(id)).thenReturn(Optional.of(post));

        //then
        Integer count = postService.getSavedCount(id);

        assertEquals(count,1);
    }

    @DisplayName("create post successfully")
    @Test
    void test_createPost() {
        // given
        PostReqDto postRequest = PostReqDto.builder()
                .title("Test Post")
                .slug("test-post")
                .excerpt("Test excerpt")
                .thumbnail("path/to/thumbnail.jpg")
                .featuredImageUrl("path/to/featured.jpg")
                .content("Test content")
                .status("DRAFT")
                .readingTimeMinutes(5)
                .isFeatured(false)
                .metaTitle("Meta Title")
                .metaDescription("Meta Description")
                .authorId(UUID.randomUUID())
                .categoryId(UUID.randomUUID())
                .tagIds(Set.of(UUID.randomUUID()))
                .build();

        Post post = new Post();
        post.setTitle(postRequest.getTitle());
        post.setContent(postRequest.getContent());

        // when
        when(postMapper.toPostEntity(postRequest)).thenReturn(post);
        when(postRepository.save(post)).thenReturn(post);

        // then
        postService.createPost(postRequest);

        // verify
        verify(postMapper).toPostEntity(postRequest);
        verify(postRepository).save(post);
        verifyNoMoreInteractions(postMapper, postRepository);
    }

    @DisplayName("create post successfully with thumbnail")
    @Test
    void test_createPostWithThumbnail() throws IOException {
        // given
        String userId = "i1";
        String content = "content";
        String title = "title";
        MultipartFile thumbnailFile = mock(MultipartFile.class);
        UUID postId = UUID.randomUUID();

        Post post = new Post();
        post.setId(postId);
        post.setContent(content);
        post.setTitle(title);
        post.setUserId(userId);

        PostReqDto postReqDto = PostReqDto.builder()
                .title(title)
                .content(content)
                .authorId(postId)
                .thumbnail("thumbnail.jpg")
                .build();

        // when
        when(thumbnailFile.getOriginalFilename()).thenReturn("test.jpg");
        when(thumbnailFile.getContentType()).thenReturn("image/jpeg");
        when(thumbnailFile.getBytes()).thenReturn(new byte[0]);
        when(fileStorageService.saveFile(thumbnailFile)).thenReturn("thumbnail.jpg");
        when(postMapper.toPostEntity(any())).thenReturn(post);
        when(postRepository.save(any())).thenReturn(post);

        // then
        postService.createPost(postReqDto);

        // verify
        verify(fileStorageService).saveFile(thumbnailFile);
        verify(postRepository).save(any());
        verify(postMapper).toPostEntity(any());
        verifyNoMoreInteractions(postRepository, postMapper, fileStorageService);
    }

    @DisplayName("save post successfully")
    @Test
    void test_savePost() {
        // given
        UUID postId = UUID.randomUUID();
        String userId = "i1";

        Post post = new Post();
        post.setId(postId);
        post.setContent("content");
        post.setUserId("user1");
        post.setSaved(new HashSet<>());

        // when
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(postRepository.save(any())).thenReturn(post);

        // then
        postService.savePost(postId, userId);

        // verify
        verify(postRepository).findById(postId);
        verify(postRepository).save(post);
        verifyNoMoreInteractions(postRepository);
        assertTrue(post.getSaved().contains(userId));
    }

    @DisplayName("unsave post successfully")
    @Test
    void test_unsavePost() {
        // given
        UUID postId = UUID.randomUUID();
        String userId = "i1";

        Post post = new Post();
        post.setId(postId);
        post.setContent("content");
        post.setUserId("user1");
        post.setSaved(new HashSet<>(Collections.singletonList(userId)));

        // when
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(postRepository.save(any())).thenReturn(post);

        // then
        postService.unsavePost(postId, userId);

        // verify
        verify(postRepository).findById(postId);
        verify(postRepository).save(post);
        verifyNoMoreInteractions(postRepository);
        assertFalse(post.getSaved().contains(userId));
    }

    @DisplayName("save post should throw exception when post not found")
    @Test
    void savePost_shouldThrowException_whenPostNotFoundWithGivenId() {
        // given
        UUID postId = UUID.randomUUID();
        String userId = "i1";

        // when
        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        // then
        assertThrows(ResourceNotFoundException.class, () -> postService.savePost(postId, userId));
        verify(postRepository).findById(postId);
        verifyNoMoreInteractions(postRepository);
    }

    @DisplayName("unsave post should throw exception when post not found")
    @Test
    void unsavePost_shouldThrowException_whenPostNotFoundWithGivenId() {
        // given
        UUID postId = UUID.randomUUID();
        String userId = "i1";

        // when
        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        // then
        assertThrows(ResourceNotFoundException.class, () -> postService.unsavePost(postId, userId));
        verify(postRepository).findById(postId);
        verifyNoMoreInteractions(postRepository);
    }

    @Test
    void test_updatePost(){
        //given
        UUID id = UUID.randomUUID();
        CreateUpdatePostRequest request = new CreateUpdatePostRequest();
        request.setTitle("update");
        request.setContent("content");
        String userId = "i1";

        Post post = new Post();
        post.setTitle("title");
        post.setContent("post");
        post.setUserId("i1");

        UserDto apiUser = new UserDto();
        apiUser.setId("i1");
        apiUser.setRoles(List.of("ROLE_ADMIN"));

        //when
        when(postRepository.findById(id)).thenReturn(Optional.of(post));
        when(userApiClient.findUserById(userId)).thenReturn(apiUser);

        //then
        postService.updatePost(id,request,userId);

        assertEquals(request.getTitle(),post.getTitle());
        assertEquals(request.getContent(),post.getContent());

        verify(postRepository).findById(id);
        verify(userApiClient).findUserById(userId);
        verify(postRepository).save(post);

    }

    @Test
    void updatePost_shouldThrowException_whenPostNotFoundWithGivenId(){
        //given
        UUID id = UUID.randomUUID();
        CreateUpdatePostRequest request = new CreateUpdatePostRequest();
        request.setTitle("update");
        request.setContent("content");
        String userId = "i1";

        //when
        when(postRepository.findById(id)).thenReturn(Optional.empty());

        //then
        Assertions.assertThatThrownBy(
                () -> postService.updatePost(id,request,userId)
        ).isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Post not found with this id ");

        //verify
        verify(postRepository).findById(id);
    }

    @Test
    void updatePost_shouldThrowException_whenUserNoAccess(){
        //given
        UUID postId = UUID.randomUUID();
        String userId = "user1";
        CreateUpdatePostRequest request = new CreateUpdatePostRequest();
        request.setTitle("Updated Title");
        request.setContent("Updated Content");

        Post post = new Post();
        post.setId(postId);
        post.setUserId("anotherUser");
        post.setTitle("Original Title");
        post.setContent("Original Content");

        UserDto apiUser = new UserDto();
        apiUser.setId(userId);
        apiUser.setRoles(List.of("ROLE_USER"));

        //when
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(userApiClient.findUserById(userId)).thenReturn(apiUser);

        //then
        Assertions.assertThatThrownBy(
                () -> postService.updatePost(postId,request,userId)
        ).isInstanceOf(ResourceNoAccessException.class)
                .hasMessageContaining("You have no access to this resource");

        //verfiy
        verify(postRepository).findById(postId);
        verify(userApiClient).findUserById(userId);

    }

    @Test
    void test_uploadThumbnail(){
        //given
        UUID postId = UUID.randomUUID();
        String userId = "i1";
        MultipartFile thumbnailFile = mock(MultipartFile.class);
        String thumbnailPath = "path/to/thumbnail";

        Post post = new Post();
        post.setId(postId);
        post.setUserId(userId);

        UserDto apiUser = new UserDto();
        apiUser.setId(userId);
        apiUser.setRoles(List.of("ROLE_ADMIN"));

        //when
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(userApiClient.findUserById(userId)).thenReturn(apiUser);
        when(fileStorageService.saveFile(thumbnailFile)).thenReturn(thumbnailPath);

        postService.uploadThumbnail(postId, thumbnailFile, userId);

        // Then
        assertEquals(thumbnailPath, post.getThumbnail());
        verify(postRepository).findById(postId);
        verify(userApiClient).findUserById(userId);
        verify(fileStorageService).saveFile(thumbnailFile);
        verify(postRepository).save(post);
    }

    @Test
    void updateThumbnail_shouldThrowException_whenPostNotFoundWithGivenId(){
        //given
        UUID postId = UUID.randomUUID();
        String userId = "i1";
        MultipartFile thumbnailFile = mock(MultipartFile.class);
        String thumbnailPath = "path/to/thumbnail";

        Post post = new Post();
        post.setId(postId);
        post.setUserId(userId);

        UserDto apiUser = new UserDto();
        apiUser.setId(userId);
        apiUser.setRoles(List.of("ROLE_ADMIN"));

        //when
        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        //then
        Assertions.assertThatThrownBy(
                () -> postService.uploadThumbnail(postId,thumbnailFile,userId)
        ).isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Post not found with this id ");

    }

    @Test
    void updateThumbnail_shouldReturnException_whenUserNoAccess(){
        // Given
        UUID postId = UUID.randomUUID();
        String userId = "user123";
        MultipartFile thumbnailFile = mock(MultipartFile.class);

        Post post = new Post();
        post.setId(postId);
        post.setUserId("differentUser");

        UserDto apiUser = new UserDto();
        apiUser.setId(userId);
        apiUser.setRoles(List.of("ROLE_USER"));

        // When
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(userApiClient.findUserById(userId)).thenReturn(apiUser);

        // Then
        ResourceNoAccessException thrown = assertThrows(ResourceNoAccessException.class, () -> {
            postService.uploadThumbnail(postId, thumbnailFile, userId);
        });

        assertEquals("You have no access to this resource", thrown.getMessage());

        verify(postRepository).findById(postId);
        verify(userApiClient).findUserById(userId);
        verify(fileStorageService, never()).saveFile(thumbnailFile);
        verify(postRepository, never()).save(post);
    }

    @Test
    void uploadThumbnail_shouldThrowException_whenThumbnailIsNull(){
        // Given
        UUID postId = UUID.randomUUID();
        String userId = "user123";
        MultipartFile thumbnailFile = mock(MultipartFile.class);

        Post post = new Post();
        post.setId(postId);
        post.setUserId("differentUser");

        UserDto apiUser = new UserDto();
        apiUser.setId(userId);
        apiUser.setRoles(List.of("ROLE_ADMIN"));

        // When
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(userApiClient.findUserById(userId)).thenReturn(apiUser);
        when(fileStorageService.saveFile(thumbnailFile)).thenReturn(null);

        // Then
        RuntimeException thrown = assertThrows(RuntimeException.class, () -> {
            postService.uploadThumbnail(postId, thumbnailFile, userId);
        });

        assertEquals("Failed to save thumbnail", thrown.getMessage());

        verify(postRepository).findById(postId);
        verify(userApiClient).findUserById(userId);
    }

    @DisplayName("like post successfully")
    @Test
    void test_likePost() {
        // given
        UUID postId = UUID.randomUUID();
        String userId = "user1";
        Post post = new Post();
        post.setId(postId);
        post.setLikes(new HashSet<>());

        // when
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        postService.likePost(postId, userId);

        // then
        verify(postRepository).findById(postId);
        verify(postRepository).save(post);
        assertEquals(1, post.getLikes().size());
        assertTrue(post.getLikes().contains(userId));
    }

    @DisplayName("unlike post successfully")
    @Test
    void test_unlikePost() {
        // given
        UUID postId = UUID.randomUUID();
        String userId = "user1";
        Post post = new Post();
        post.setId(postId);
        post.setLikes(new HashSet<>(Collections.singletonList(userId)));

        // when
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        postService.unlikePost(postId, userId);

        // then
        verify(postRepository).findById(postId);
        verify(postRepository).save(post);
        assertEquals(0, post.getLikes().size());
        assertFalse(post.getLikes().contains(userId));
    }

    @DisplayName("like post should throw exception when post not found")
    @Test
    void likePost_shouldThrowException_whenPostNotFoundWithGivenId() {
        // given
        UUID postId = UUID.randomUUID();
        String userId = "user1";

        // when
        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        // then
        assertThrows(ResourceNotFoundException.class, () -> postService.likePost(postId, userId));
        verify(postRepository).findById(postId);
        verifyNoMoreInteractions(postRepository);
    }

    @DisplayName("unlike post should throw exception when post not found")
    @Test
    void unlikePost_shouldThrowException_whenPostNotFoundWithGivenId() {
        // given
        UUID postId = UUID.randomUUID();
        String userId = "user1";

        // when
        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        // then
        assertThrows(ResourceNotFoundException.class, () -> postService.unlikePost(postId, userId));
        verify(postRepository).findById(postId);
        verifyNoMoreInteractions(postRepository);
    }

    @DisplayName("delete post successfully")
    @Test
    void test_deletePost() {
        // given
        UUID postId = UUID.randomUUID();
        String userId = "i1";

        Post post = new Post();
        post.setTitle("post");
        post.setUserId(userId);

        UserDto apiUser = new UserDto();
        apiUser.setId(userId);
        apiUser.setRoles(List.of("ROLE_ADMIN"));

        // when
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(userApiClient.findUserById(userId)).thenReturn(apiUser);

        // then
        postService.deletePost(postId, userId);

        // verify
        verify(postRepository).findById(postId);
        verify(userApiClient).findUserById(userId);
        verify(postRepository).deleteById(postId);
    }

    @DisplayName("deletePost should throw ResourceNoAccessException when user has no access")
    @Test
    void test_deletePost_shouldThrowResourceNoAccessException_whenUserHasNoAccess() {
        // Given
        UUID postId = UUID.randomUUID();
        String userId = "user123";
        Post post = new Post();
        post.setId(postId);
        post.setUserId("differentUser");

        UserDto apiUser = new UserDto();
        apiUser.setId(userId);
        apiUser.setRoles(List.of("ROLE_USER"));

        // When
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(userApiClient.findUserById(userId)).thenReturn(apiUser);

        // Then
        ResourceNoAccessException thrown = assertThrows(ResourceNoAccessException.class, () -> {
            postService.deletePost(postId, userId);
        });

        assertEquals("You have no access to this resource", thrown.getMessage());

        verify(postRepository).findById(postId);
        verify(userApiClient).findUserById(userId);
        verify(postRepository, never()).deleteById(postId);
    }

    @DisplayName("deletePost should throw ResourceNotFoundException when post not found")
    @Test
    void test_deletePost_shouldThrowResourceNotFoundException_whenPostNotFound() {
        // Given
        UUID postId = UUID.randomUUID();
        String userId = "user123";

        UserDto apiUser = new UserDto();
        apiUser.setId(userId);
        apiUser.setRoles(List.of("ROLE_USER"));

        // When
        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        // Then
        Assertions.assertThatThrownBy(
                () -> postService.deletePost(postId, userId)
        ).isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Post not found with this id ");

        verify(postRepository).findById(postId);
        verify(postRepository, never()).deleteById(postId);
    }
}
