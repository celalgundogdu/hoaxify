package com.hoaxify.dto.converter;

import com.hoaxify.dto.UserDto;
import com.hoaxify.user.User;
import org.springframework.stereotype.Component;

@Component
public class UserDtoConverter {

    public UserDto convert(User user) {
        return new UserDto(user.getFullName(), user.getUsername(), user.getPassword());
    }
}
