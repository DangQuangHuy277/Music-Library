package com.example.musicLibrary.security.user;


import com.example.musicLibrary.exception.ResourceNotFoundException;
import com.example.musicLibrary.user.User;
import com.example.musicLibrary.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    /**
     * Username of security user (also is subject of jwt) is email
     */
    @Override
    public UserDetailsImpl loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User " + email + " not found"));
        return new UserDetailsImpl(user);
    }
}
