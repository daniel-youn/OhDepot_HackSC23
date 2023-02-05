package net.csci201final.springboot.repository;

import org.springframework.data.repository.CrudRepository;

import net.csci201final.springboot.model.Cards;
// import net.csci201final.springboot.model.Users;

public interface CardRepository extends CrudRepository<Cards, String>{}
