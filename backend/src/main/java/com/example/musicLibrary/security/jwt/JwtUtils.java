package com.example.musicLibrary.security.jwt;

import com.example.musicLibrary.security.user.UserDetailsImpl;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;


import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Map;


@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwt.key}")
    private String jwtKey;

    @Value("${jwt.expirationMs}")
    private Integer jwtExpirationMs;


    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();
        SimpleGrantedAuthority role = (SimpleGrantedAuthority) user.getAuthorities().toArray()[0];
//        logger.info(jwtExpirationMs);
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .addClaims(Map.of(
                        "role", role.getAuthority(),
                        "email", user.getUsername()
                ))
                .compact();
    }

    private Key key() {
//        return Keys.secretKeyFor(SignatureAlgorithm.HS256);
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtKey));
    }

    public Claims getClaimsFromJwtToken(String authToken) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(authToken).getBody();
    }

    public boolean validateJwtToken(String authToken) {
        Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parse(authToken);
        return true;
    }
}
