package net.csci201final.springboot.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Cards
{
	
	@Id
	private String title;
	private String orgMessage;
	private String organization;
	private String taxID;
	
	public String getTaxID() {
		return taxID;
	}
	public void setTaxID(String taxID) {
		this.taxID = taxID;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getMessage() {
		return orgMessage;
	}
	public void setMessage(String message) {
		this.orgMessage = message;
	}
	public String getOrganization() {
		return organization;
	}
	public void setOrganization(String organization) {
		this.organization = organization;
	}
}