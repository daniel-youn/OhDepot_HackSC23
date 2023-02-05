package net.csci201final.springboot.model;

import javax.persistence.Entity;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Users {
//	@GeneratedValue(strategy=GenerationType.IDENTITY)

	@Id
	private String userName;
	private String userPassword;
	private String actualName;
	private String email;
	private String gender;
	private Integer age;

	

	public String getUserName(){
		return userName;
	}
    public String getUserPassword(){
        return userPassword;
    }
	public String getActualName(){
		return actualName;
	}
	public String getEmail(){
		return email;
	}
	public Integer getAge()
	{
		return age;
	}
	public String getGender()
	{
		return gender;
	}

	public void setActualName(String name){
		actualName = name;
	}
    public void setUserPassword(String pass){
        userPassword = pass;
    }
	public void setEmail(String mail){
		email = mail;
	}
	public void setUserName(String user){
		userName = user;
	}
	public void setGender(String gen){
		gender = gen;
	}
	public void setAge(int ageIn)
	{
		age = ageIn;
	}
	
}
