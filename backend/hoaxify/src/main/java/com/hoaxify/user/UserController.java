package com.hoaxify.user;

import com.hoaxify.dto.CreateUserRequest;
import com.hoaxify.error.ApiError;
import com.hoaxify.shared.GenericResponse;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/1.0")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    public GenericResponse createUser(@Valid @RequestBody CreateUserRequest createUserRequest) {
        // log.info(user.toString());
        userService.save(createUserRequest);
        return new GenericResponse("User created!");
    }

}
