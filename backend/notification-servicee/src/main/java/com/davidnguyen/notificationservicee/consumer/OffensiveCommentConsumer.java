package com.davidnguyen.notificationservicee.consumer;

import com.davidnguyen.notificationservicee.dto.OffensiveCommentNotification;
import com.davidnguyen.notificationservicee.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class OffensiveCommentConsumer {
    private final NotificationService notificationService;

    @KafkaListener(topics = "offensive-comments", groupId = "notification-service")
    public void consumeOffensiveComment(OffensiveCommentNotification notification) {
        log.info("Received offensive comment notification: {}", notification);
        
        // Create notification for admin
        String message = String.format(
            "Offensive comment detected in post %s. Comment ID: %d, Author ID: %s, Content: %s, Reason: %s",
            notification.getPostId(),
            notification.getCommentId(),
            notification.getAuthorId(),
            notification.getCommentContent(),
            notification.getReason()
        );
        
        // TODO: Replace with actual admin UUID
        UUID adminId = UUID.fromString("00000000-0000-0000-0000-000000000000");
        notificationService.createNotification("OFFENSIVE_COMMENT", message, adminId);
        
        // Send email notification to admin
        notificationService.sendEmailNotification(
            "admin@example.com", // TODO: Replace with actual admin email
            "Offensive Comment Alert",
            message
        );
    }
} 