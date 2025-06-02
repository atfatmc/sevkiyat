package com.sevkiyat.repository;

import com.sevkiyat.entity.Permission;
import com.sevkiyat.entity.Permission.PermissionType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Optional<Permission> findByName(PermissionType name);
    boolean existsByName(PermissionType name);
} 