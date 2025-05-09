package com.davidnguyen.api_gateway.config;

import com.davidnguyen.api_gateway.filter.AuthenticationPreFilter;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.davidnguyen.api_gateway.filter.AuthorizationPreFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.text.SimpleDateFormat;

@Configuration
public class RouteConfiguration {

    @Bean
    public ObjectMapper objectMapper() {
        JsonFactory factory = new JsonFactory();
        factory.configure(JsonGenerator.Feature.IGNORE_UNKNOWN, true);

        ObjectMapper objectMapper = new ObjectMapper(factory);
        objectMapper.configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, true);
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));

        return objectMapper;
    }

    @Bean
    public RouteLocator routes(
            RouteLocatorBuilder builder,
            AuthenticationPreFilter authFilter,
            AuthorizationPreFilter authorizationFilter) {
        return builder.routes()
                .route("security-service-route", r -> r.path("/security-service/**")
                        .filters(f ->
                                f.rewritePath("/security-service(?<segment>/?.*)", "$\\{segment}")
                                        .filter(authFilter.apply(new AbstractGatewayFilterFactory.NameConfig()))
                                        .filter(authorizationFilter.apply(new AbstractGatewayFilterFactory.NameConfig())))
                        .uri("lb://SECURITY-SERVICE"))
                .route("user-service-route", r -> r.path("/user-service/**")
                        .filters(f ->
                                f.rewritePath("/user-service(?<segment>/?.*)", "$\\{segment}")
                                        .filter(authFilter.apply(new AbstractGatewayFilterFactory.NameConfig()))
                                        .filter(authorizationFilter.apply(new AbstractGatewayFilterFactory.NameConfig())))
                        .uri("lb://USER-SERVICE"))
                .route("post-service-route", r -> r.path("/post-service/**")
                        .filters(f ->
                                f.rewritePath("/post-service(?<segment>/?.*)", "$\\{segment}")
                                        .filter(authFilter.apply(new AbstractGatewayFilterFactory.NameConfig()))
                                        .filter(authorizationFilter.apply(new AbstractGatewayFilterFactory.NameConfig())))
                        .uri("lb://POST-SERVICE"))
                .build();
    }
}
