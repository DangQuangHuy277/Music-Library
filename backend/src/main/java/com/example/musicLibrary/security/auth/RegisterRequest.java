package com.example.musicLibrary.security.auth;

import com.example.musicLibrary.user.Role;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class RegisterRequest {
    @NotNull
    private String username;
    @NotNull
    private String email;
    @NotNull
    @Min(5)
    private String password;
    @NotNull
    private Role role;
}
