package com.sevkiyat.service.impl;

import com.sevkiyat.entity.User;
import com.sevkiyat.security.JwtTokenUtil;
import com.sevkiyat.service.AuthService;
import com.sevkiyat.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserService userService;

    public AuthServiceImpl(AuthenticationManager authenticationManager,
                          JwtTokenUtil jwtTokenUtil,
                          UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
    }

    @Override
    public String login(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtTokenUtil.generateToken(userDetails);
    }

    @Override
    public void logout(String token) {
        SecurityContextHolder.clearContext();
    }

    @Override
    public User register(User user) {
        if (userService.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        return userService.createUser(user);
    }
} 