package com.davidnguyen.notification_service.service;

import com.davidnguyen.notification_service.entity.Notification;
import com.davidnguyen.notification_service.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final JavaMailSender mailSender;

    public void createNotification(String type, String message, UUID userId) {
        Notification notification = Notification.builder()
                .type(type)
                .message(message)
                .userId(userId)
                .status("UNREAD")
                .build();
        
        notificationRepository.save(notification);
    }

    public void sendEmailNotification(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    public List<Notification> getUserNotifications(UUID userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public void markAsRead(Long notificationId) {
        notificationRepository.findById(notificationId).ifPresent(notification -> {
            notification.setStatus("READ");
            notification.setReadAt(java.time.LocalDateTime.now());
            notificationRepository.save(notification);
        });
    }
} 