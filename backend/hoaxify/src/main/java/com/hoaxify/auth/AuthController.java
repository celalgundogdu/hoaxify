package com.hoaxify.auth;

import com.hoaxify.dto.converter.UserDtoConverter;
import com.hoaxify.shared.CurrentUser;
import com.hoaxify.user.User;
import com.hoaxify.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/1.0")
public class AuthController {

    private final UserDtoConverter converter;
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    public AuthController(UserDtoConverter converter) {
        this.converter = converter;
    }

    @PostMapping("/auth")
    ResponseEntity<?> handleAuthentication(@CurrentUser User user) {
        // log.info(authorization);
        return ResponseEntity.ok(converter.convertToUserAuthDto(user));
    }
}
