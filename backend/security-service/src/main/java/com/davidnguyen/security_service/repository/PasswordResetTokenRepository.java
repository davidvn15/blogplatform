package com.davidnguyen.security_service.repository;


import com.davidnguyen.security_service.entity.PasswordResetToken;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PasswordResetTokenRepository extends MongoRepository<PasswordResetToken, String> {
    PasswordResetToken findByToken(String passwordResetToken);
}
