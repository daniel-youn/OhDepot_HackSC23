package net.csci201final.springboot.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;

import net.csci201final.springboot.model.Users;
import net.csci201final.springboot.repository.UserRepository;
import net.csci201final.springboot.links.UserLinks;


@Controller
@RequestMapping("/api/")
public class UserController {

	@Autowired
	UserRepository userRepository;

	// sample route: curl "localhost:8080/api/users"
	@GetMapping(path = UserLinks.LIST_USERS)
	public @ResponseBody Iterable<Users> getUsers(){
		return userRepository.findAll();
	}

	
	@PostMapping(path = UserLinks.ADD_USER)
	public @ResponseBody String addUser(@RequestBody String userObj) throws JsonMappingException, JsonProcessingException{
		System.out.println("************* 1 Hello from adduser: "+userObj);
		Users n = new Users();
		ObjectMapper mapper = new ObjectMapper();
     	addUserReqBody user = mapper.readValue(userObj, addUserReqBody.class);
		String userName = user.getUserName();
		n.setUserName(userName);

		if(userRepository.existsById(userName))
		{
			Optional<Users> u = userRepository.findById(userName);
			Users us = u.get();
			System.out.println("************* final key sent in response is: "+us.getUserName());
			String response = "{\"actualName\":\"" + us.getActualName() + "\",\"userPassword\":" + "\",\"email\":" + "\",\"gender\":" + us.getGender() + ",\"age\":" + us.getAge()+"}";
			return response;
		} else {
//			Users repo = new Users();
//			repo.setUserName(userName);
			n.setActualName(user.getActualName());
			n.setAge(user.getAge());
			n.setEmail(user.getEmail());
			n.setGender(user.getGender());
			n.setUserPassword(user.getUserPassword());
			Users repo = userRepository.save(n);
			String response = "{\"userName\":\"" + n.getUserName() +  "\",\"actualName\":" + n.getActualName() + "\",\"userPassword\":" + n.getUserPassword() + "\",\"email\":" + n.getEmail() + "\",\"gender\":" + n.getGender() + ",\"age\":" + n.getAge()+"}";
			return response;
		}
	}

	
}
