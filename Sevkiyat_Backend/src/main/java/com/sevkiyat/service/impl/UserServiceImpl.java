package com.sevkiyat.service.impl;

import com.sevkiyat.entity.User;
import com.sevkiyat.entity.Permission;
import com.sevkiyat.entity.Role;
import com.sevkiyat.repository.UserRepository;
import com.sevkiyat.repository.RoleRepository;
import com.sevkiyat.repository.PermissionRepository;
import com.sevkiyat.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                          RoleRepository roleRepository,
                          PermissionRepository permissionRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        if (user.getRoles() != null) {
            Set<Role> updatedRoles = new HashSet<>();
            user.getRoles().forEach(role -> {
                if (role.getId() == null) {
                    // Role henüz kaydedilmemişse
                    Set<Permission> updatedPermissions = new HashSet<>();
                    role.getPermissions().forEach(permission -> {
                        if (permission.getId() == null) {
                            // Permission henüz kaydedilmemişse, önce var mı diye kontrol et
                            Optional<Permission> existingPermission = permissionRepository.findByName(permission.getName());
                            if (existingPermission.isPresent()) {
                                updatedPermissions.add(existingPermission.get());
                            } else {
                                updatedPermissions.add(permissionRepository.save(permission));
                            }
                        } else {
                            updatedPermissions.add(permission);
                        }
                    });
                    role.setPermissions(updatedPermissions);
                    
                    // Role'ü kaydet veya var olanı bul
                    Optional<Role> existingRole = roleRepository.findByName(role.getName());
                    if (existingRole.isPresent()) {
                        updatedRoles.add(existingRole.get());
                    } else {
                        updatedRoles.add(roleRepository.save(role));
                    }
                } else {
                    updatedRoles.add(role);
                }
            });
            user.setRoles(updatedRoles);
        }
        
        return userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public User updateUser(User user) {
        return userRepository.findById(user.getId())
                .map(existingUser -> {
                    existingUser.setUsername(user.getUsername());
                    if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                        existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
                    }
                    existingUser.setCompany(user.getCompany());
                    existingUser.setCommissionRate(user.getCommissionRate());
                    existingUser.setStatus(user.isStatus());
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + user.getId()));
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
} 