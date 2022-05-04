package com.hoaxify.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {

    private String fullName;
    private String username;
    private String password;
}
