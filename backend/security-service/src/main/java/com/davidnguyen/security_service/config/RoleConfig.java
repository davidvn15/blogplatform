package com.davidnguyen.security_service.config;

import com.davidnguyen.security_service.entity.Role;
import com.davidnguyen.security_service.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.IndexOperations;

@Configuration
@RequiredArgsConstructor
public class RoleConfig {

    private final RoleRepository roleRepository;
    private final MongoTemplate mongoTemplate;

    @Bean
    public CommandLineRunner initializeRoles() {
        return args -> {
            // Ensure 'name' field is indexed uniquely
            IndexOperations indexOps = mongoTemplate.indexOps(Role.class);

            addRoleIfNotExists("ROLE_USER");
            addRoleIfNotExists("ROLE_ADMIN");
        };
    }

    private void addRoleIfNotExists(String roleName) {
        if (!roleRepository.findByName(roleName).isPresent()) {
            Role role = Role.builder()
                    .name(roleName)
                    .build();
            roleRepository.save(role);
        }
    }
}

