package com.example.musicLibrary.security.filter;

import com.example.musicLibrary.security.jwt.JwtUtils;
import com.example.musicLibrary.security.user.UserDetailsServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;

/**
 * This filter will be used to authenticate the request by the JWT token in the Authorization header.
 * Note that this will be used for all requests excluding the authenticate, register, and refresh-token requests
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getRequestURI().startsWith("/api/v1/auth");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwtToken = parseJwt(request);
            if (jwtUtils.validateJwtToken(jwtToken)) {
                Claims claims = jwtUtils.getClaimsFromJwtToken(jwtToken);

                UserDetails userDetails = userDetailsService.loadUserByUsername(claims.get("email").toString());

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                filterChain.doFilter(request, response);
            }
        } catch (MalformedJwtException e) {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> error = Map.of("message", "Malformed JWT JSON");
            response.setContentType("application/json;charset=UTF-8");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            mapper.writeValue(response.getOutputStream(), error);
//            throw e;
        } catch (Exception e) {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> error = Map.of("message", e.getMessage());
            response.setContentType("application/json;charset=UTF-8");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            mapper.writeValue(response.getOutputStream(), error);
        }
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (!StringUtils.hasText(headerAuth))
            throw new AuthenticationCredentialsNotFoundException("Missing token at Authorization header");
        if (!headerAuth.startsWith("Bearer "))
            throw new BadCredentialsException("Authorization header is in wrong format");
        return headerAuth.substring(7);
    }
}
