package com.davidnguyen.post_service.service;

import com.davidnguyen.post_service.dto.OffensiveCommentNotification;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaNotificationService {
    private final KafkaTemplate<String, OffensiveCommentNotification> kafkaTemplate;
    private static final String OFFENSIVE_COMMENT_TOPIC = "offensive-comments";

    public void sendOffensiveCommentNotification(OffensiveCommentNotification notification) {
        kafkaTemplate.send(OFFENSIVE_COMMENT_TOPIC, notification);
    }
} 