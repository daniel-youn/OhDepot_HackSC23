package net.csci201final.springboot.links;

import org.springframework.stereotype.Component;

@Component
public class UserLinks {
    public static final String LIST_USERS = "/users";
    public static final String ADD_USER = "/addUser/json";
}
