package com.sevkiyat.service;

import com.sevkiyat.entity.User;
 
public interface AuthService {
    String login(String username, String password);
    void logout(String token);
    User register(User user);
} 