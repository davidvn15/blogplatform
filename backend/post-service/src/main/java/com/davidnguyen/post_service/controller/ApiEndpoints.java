package com.davidnguyen.post_service.controller;

public class ApiEndpoints {
    public static final String BASE_URL = "/api/v1";

    // Heartbeat
    public static final String HEARTBEAT = BASE_URL + "/heartbeat";

    // Posts
    public static final String POSTS = BASE_URL + "/posts";
    public static final String POST_DETAIL = POSTS + "/{postId}";
    public static final String POST_THUMBNAIL = POST_DETAIL + "/thumbnail";
    public static final String POST_LIKE = POST_DETAIL + "/like";
    public static final String POST_SAVE = POST_DETAIL + "/save";
    public static final String POST_SAVES_COUNT = POST_DETAIL + "/saves/count";

    // User posts and saves
    public static final String USER_POSTS = BASE_URL + "/users/{userId}/posts";
    public static final String USER_SAVES = BASE_URL + "/users/{userId}/saves";

    // Comments
    public static final String POST_COMMENTS = POST_DETAIL + "/comments";
    public static final String COMMENT_DETAIL = BASE_URL + "/comments/{commentId}";
}
