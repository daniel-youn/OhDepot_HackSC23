package net.csci201final.springboot.repository;

import org.springframework.data.repository.CrudRepository;

import net.csci201final.springboot.model.Users;

public interface UserRepository extends CrudRepository<Users, String>{}
