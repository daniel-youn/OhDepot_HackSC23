package net.csci201final.springboot.links;

import org.springframework.stereotype.Component;

@Component
public class CardLinks {
    public static final String LIST_CARDS = "/Cards";
    public static final String ADD_CARD = "/addCard/json";
    public static final String SEARCH_TAG = "/search_tag";
    public static final String GET_RANDOM = "/GetRand";
    public static final String GET_5RANDOM = "/Get5Rand";
}