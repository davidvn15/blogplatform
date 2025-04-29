package com.davidnguyen.post_service.controller;

public class ApiEndpoints {
    public static final String BASE_URL = "/api/v1";

    // POST
    public static final String POST = BASE_URL + "/posts";
    public static final String POST_HEARTBEAT = POST + "/heartbeat";
    public static final String POST_DETAIL = POST + "/{postId}";
    public static final String POST_BY_USER = POST + "/{userId}";
    public static final String POST_UPDATE = POST + "/{postId}";
    public static final String POST_THUMBNAIL = POST + "/{postId}/thumbnail";
    public static final String POST_LIKE = POST + "/{postId}/{userId}";
    public static final String POST_TEMP_SAVE = POST + "/{postId}/{userId}";
    public static final String POST_DELETE = POST + "/{postId}";

    // COMMENT
    public static final String COMMENT = POST + "/{postId}/comments";
}
