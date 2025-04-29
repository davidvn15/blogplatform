package com.davidnguyen.post_service.controller;

public class ApiEndpoints {
    public static final String BASE_URL = "/api/v1";

    public static final String POST = BASE_URL + "/posts";
    public static final String POST_HEARTBEAT = POST + "/heartbeat";
    public static final String POST_DETAIL = POST + "/{postId}";
    public static final String POST_BY_USER = POST + "/{userId}";
    public static final String POST_UPDATE = POST + "/{postId}";
}
