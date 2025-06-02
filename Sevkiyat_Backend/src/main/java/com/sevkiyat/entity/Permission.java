package com.sevkiyat.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "permissions")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    @Enumerated(EnumType.STRING)
    private PermissionType name;

    public enum PermissionType {
        // User permissions
        USER_CREATE,
        USER_READ,
        USER_UPDATE,
        USER_DELETE,

        // Company permissions
        COMPANY_CREATE,
        COMPANY_READ,
        COMPANY_UPDATE,
        COMPANY_DELETE,

        // Team permissions
        TEAM_CREATE,
        TEAM_READ,
        TEAM_UPDATE,
        TEAM_DELETE,

        // Menu permissions
        MENU_ADMIN,
        MENU_COMPANY,
        MENU_TEAM
    }
} 