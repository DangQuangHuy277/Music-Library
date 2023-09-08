package com.example.musicLibrary.security.auth;

import com.example.musicLibrary.exception.ResourceAlreadyExistException;
import com.example.musicLibrary.security.jwt.JwtUtils;
import com.example.musicLibrary.security.user.UserDetailsImpl;
import com.example.musicLibrary.user.Role;
import com.example.musicLibrary.user.User;
import com.example.musicLibrary.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail()))
            throw new ResourceAlreadyExistException("Email is already in use!");
        if (userRepository.existsByUsername(request.getUsername()))
            throw new ResourceAlreadyExistException("Username is already in use!");
        Role role = request.getRole();

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

      
        Authentication authentication =  authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new AuthenticationResponse(jwt, userDetails.getUser().getUsername());
    }
}
