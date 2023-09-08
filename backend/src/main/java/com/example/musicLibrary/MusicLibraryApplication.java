package com.example.musicLibrary;

import jakarta.persistence.EntityManagerFactory;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.web.FilterChainProxy;

@SpringBootApplication
public class MusicLibraryApplication {



	public static void main(String[] args) {
		SpringApplication.run(MusicLibraryApplication.class, args);
	}

}
