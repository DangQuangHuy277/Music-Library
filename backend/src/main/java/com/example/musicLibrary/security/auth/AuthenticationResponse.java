package com.example.musicLibrary.security.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AuthenticationResponse {
    private String accessToken;
    //    private String refreshToken;
    private String username;
}
