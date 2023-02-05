
package net.csci201final.springboot.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Collections;
import java.util.Random;
import java.util.stream.IntStream;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
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

import net.csci201final.springboot.model.Cards;
import net.csci201final.springboot.model.Users;
import net.csci201final.springboot.repository.CardRepository;
import net.csci201final.springboot.repository.UserRepository;
import net.csci201final.springboot.links.CardLinks;
import net.csci201final.springboot.links.UserLinks;


@Controller
@RequestMapping("/api/")
public class CardController {

	@Autowired
	CardRepository cardRepository;

	// sample route: curl "localhost:8080/api/users"
	@GetMapping(path = CardLinks.LIST_CARDS)
	public @ResponseBody Iterable<Cards> getCards(){
		return cardRepository.findAll();
	}
	
	@GetMapping(path = CardLinks.GET_RANDOM)
	@CrossOrigin
	public @ResponseBody Cards getRand()
	{
		Iterable<Cards> repo = cardRepository.findAll();
		ArrayList<Cards> allCards = new ArrayList<Cards>();
		for(Cards card : repo)
		{
			allCards.add(card);
		}
		Integer size = allCards.size();
		int randomNum = ThreadLocalRandom.current().nextInt(0, size);
		Cards card = allCards.get(randomNum);
		
		return card;

	}
	
	@GetMapping(path = CardLinks.GET_5RANDOM)
	@CrossOrigin
	public @ResponseBody ArrayList<Cards> get5Rand()
	{
		Iterable<Cards> repo = cardRepository.findAll();
		ArrayList<Cards> allCards = new ArrayList<Cards>();
		for(Cards card : repo)
		{
			allCards.add(card);
		}
		System.out.println("============" + allCards.get(0).getMessage() + allCards.get(0).getOrganization());
		// Integer size = allCards.size();
		Collections.shuffle(allCards);
		ArrayList<Cards> cardList = new ArrayList<Cards>();
		for(int i = 0; (i<allCards.size() && i<5); i++){
			cardList.add(allCards.get(i));
		}
		return cardList;

	}
//	@GetMapping(path = OrgLinks.SEARCH_TAG)
//	public @ResponseBody Iterable<Organizations> getOrgByTag(@RequestBody String tag) throws JsonMappingException, JsonProcessingException
//	{
//		System.out.println("************* 1 Hello from searchorgbytag: "+ tag);
//		Organizations n = new Organizations();
//		ObjectMapper mapper = new ObjectMapper();
//     	addOrgReqBody org = mapper.readValue(orgObj, addOrgReqBody.class);
//		String orgTags = org.getTitle();
//		String[] splitTags = 
//		
//	}
	@PostMapping(path = CardLinks.ADD_CARD)
	public @ResponseBody String addOrg(@RequestBody String cardObj) throws JsonMappingException, JsonProcessingException{
		System.out.println("************* 1 Hello from addorg: "+cardObj);
		Cards n = new Cards();
		ObjectMapper mapper = new ObjectMapper();
     	addCardReqBody card = mapper.readValue(cardObj, addCardReqBody.class);
		String cardTitle = card.getTitle();
//		

		if(cardRepository.existsById(cardTitle))
		{
			Optional<Cards> u = cardRepository.findById(cardTitle);
			Cards us = u.get();
			System.out.println("************* final key sent in response is: "+us.getTitle());
			String response = "{\"message\":\"" + us.getMessage() + "\",\"organization\":" + us.getOrganization() + "\",\"taxID\":" + us.getTaxID() +"}";
			return response;
		} else {
			
			n.setTitle(card.getTitle());
			n.setMessage(card.getMessage());
			n.setOrganization(card.getOrganization());
			n.setTaxID(card.getTaxID());
			Cards repo = cardRepository.save(n);
			String response = "{\"title\":\"" + n.getTitle() +  "\",\"message\":" + n.getMessage() + "\",\"organization\":" + n.getOrganization() + "\",\"taxID\":" + n.getTaxID() +"}";
			return response;
		}
	}
	

	
}
