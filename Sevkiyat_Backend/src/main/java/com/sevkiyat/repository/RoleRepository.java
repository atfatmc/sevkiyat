package com.sevkiyat.repository;

import com.sevkiyat.entity.Role;
import com.sevkiyat.entity.Role.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleType name);
    boolean existsByName(RoleType name);
} 