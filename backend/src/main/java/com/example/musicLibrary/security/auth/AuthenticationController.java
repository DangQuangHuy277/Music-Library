package com.example.musicLibrary.security.auth;

import com.example.musicLibrary.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request){
        service.register(request);
        return new ResponseEntity<>(Map.of("message", "Account registered successfully!"),HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@Valid @RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }

//    @PostMapping("refresh-token")
//    public ResponseEntity<AuthenticationResponse> refreshToken()


}
