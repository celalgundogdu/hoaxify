package com.hoaxify.dto;

import com.hoaxify.user.UniqueUsername;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class CreateUserRequest {

    @NotBlank
    @Size(min = 4, max = 50)
    private String fullName;

    @NotBlank
    @Size(min = 4, max = 20)
    @UniqueUsername
    private String username;

    @NotNull
    @Size(min=6, max = 255)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*., ?]).*$",
            message = "En az bir küçük harf, bir büyük harf, bir rakam ve bir özel karakter içermelidir")
    private String password;

}
