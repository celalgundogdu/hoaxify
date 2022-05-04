package com.hoaxify.user;

import com.hoaxify.dto.CreateUserRequest;
import com.hoaxify.dto.converter.UserDtoConverter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

   private final UserRepository userRepository;
   private final UserDtoConverter converter;

   private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, UserDtoConverter converter) {
        this.userRepository = userRepository;
        this.converter = converter;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public void save(CreateUserRequest createUserRequest) {
        User user = new User(createUserRequest.getFullName(), createUserRequest.getUsername(), createUserRequest.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // converter.convert(userRepository.save(user));
        userRepository.save(user);
    }

}
