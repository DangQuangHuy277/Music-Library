package com.example.musicLibrary.security.auth;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {
    @NotNull
    private String email;
    @NotNull
    private String password;
}
