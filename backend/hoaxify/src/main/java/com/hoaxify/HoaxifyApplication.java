package com.hoaxify;

import com.hoaxify.dto.CreateUserRequest;
import com.hoaxify.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HoaxifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(HoaxifyApplication.class, args);
	}

	@Bean
	CommandLineRunner createInitialUsers(UserService userService) {
		return args -> {
			CreateUserRequest user = new CreateUserRequest();
			user.setFullName("First user");
			user.setUsername("user1");
			user.setPassword("Password123.");
			userService.save(user);
		};
	}
}
