package com.sevkiyat.config;

import com.sevkiyat.entity.Permission;
import com.sevkiyat.entity.Role;
import com.sevkiyat.entity.User;
import com.sevkiyat.repository.PermissionRepository;
import com.sevkiyat.repository.RoleRepository;
import com.sevkiyat.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository,
                          PermissionRepository permissionRepository,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        try {
            initializePermissions();
            initializeRoles();
            initializeAdminUser();
        } catch (Exception e) {
            logger.error("Error during data initialization: ", e);
            throw e;
        }
    }

    private void initializePermissions() {
        logger.info("Initializing permissions...");
        Arrays.stream(Permission.PermissionType.values())
                .forEach(permissionType -> {
                    if (!permissionRepository.existsByName(permissionType)) {
                        Permission permission = new Permission();
                        permission.setName(permissionType);
                        permissionRepository.save(permission);
                        logger.info("Created permission: {}", permissionType);
                    }
                });
    }

    private void initializeRoles() {
        logger.info("Initializing roles...");
        
        // Initialize Admin Role
        if (!roleRepository.existsByName(Role.RoleType.ROLE_ADMIN)) {
            Role adminRole = new Role();
            adminRole.setName(Role.RoleType.ROLE_ADMIN);
            adminRole.setPermissions(new HashSet<>(permissionRepository.findAll()));
            roleRepository.save(adminRole);
            logger.info("Created admin role with all permissions");
        }

        // Initialize Company Role
        if (!roleRepository.existsByName(Role.RoleType.ROLE_COMPANY)) {
            Role companyRole = new Role();
            companyRole.setName(Role.RoleType.ROLE_COMPANY);
            Set<Permission> companyPermissions = new HashSet<>();
            permissionRepository.findByName(Permission.PermissionType.COMPANY_READ).ifPresent(companyPermissions::add);
            permissionRepository.findByName(Permission.PermissionType.COMPANY_UPDATE).ifPresent(companyPermissions::add);
            permissionRepository.findByName(Permission.PermissionType.MENU_COMPANY).ifPresent(companyPermissions::add);
            companyRole.setPermissions(companyPermissions);
            roleRepository.save(companyRole);
            logger.info("Created company role with company-specific permissions");
        }

        // Initialize Team Role
        if (!roleRepository.existsByName(Role.RoleType.ROLE_TEAM)) {
            Role teamRole = new Role();
            teamRole.setName(Role.RoleType.ROLE_TEAM);
            Set<Permission> teamPermissions = new HashSet<>();
            permissionRepository.findByName(Permission.PermissionType.TEAM_READ).ifPresent(teamPermissions::add);
            permissionRepository.findByName(Permission.PermissionType.MENU_TEAM).ifPresent(teamPermissions::add);
            teamRole.setPermissions(teamPermissions);
            roleRepository.save(teamRole);
            logger.info("Created team role with team-specific permissions");
        }
    }

    private void initializeAdminUser() {
        logger.info("Initializing admin user...");
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setCompany("System");
            admin.setCommissionRate(0.0);
            admin.setStatus(true);
            
            roleRepository.findByName(Role.RoleType.ROLE_ADMIN).ifPresent(role -> {
                admin.setRoles(new HashSet<>(Arrays.asList(role)));
                userRepository.save(admin);
                logger.info("Created admin user");
            });
        }
    }
} 