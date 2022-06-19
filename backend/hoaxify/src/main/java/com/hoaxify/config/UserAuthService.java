package com.hoaxify.config;

import com.hoaxify.user.User;
import com.hoaxify.user.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserAuthService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserAuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userMaybe = userRepository.findByUsername(username);
        if(userMaybe == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return userMaybe;
    }
}
