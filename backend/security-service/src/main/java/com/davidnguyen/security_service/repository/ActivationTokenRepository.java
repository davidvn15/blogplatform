package com.davidnguyen.security_service.repository;

import com.davidnguyen.security_service.entity.ActivationToken;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ActivationTokenRepository extends MongoRepository<ActivationToken, String> {
    Optional<ActivationToken> findByToken(String token);
}
