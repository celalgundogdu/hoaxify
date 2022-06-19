package com.hoaxify.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserAuthDto {

    private String fullName;
    private String username;
    private String image;
}
