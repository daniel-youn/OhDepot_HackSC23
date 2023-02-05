package net.csci201final.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import net.csci201final.springboot.controller.UserController;
import net.csci201final.springboot.model.Users;
import net.csci201final.springboot.repository.UserRepository;

 @SpringBootApplication
// @ComponentScan(basePackageClasses = UserController.class)
public class SpringbootBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(SpringbootBackendApplication.class, args);
	}


}
 