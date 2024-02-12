package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.AmministratoreScuola;

public interface AmministratoreScuolaRepository extends JpaRepository<AmministratoreScuola, Long> {
	AmministratoreScuola findByUsernameAndPassword(String username, String password);
	//AmministratoreScuola findByToken(String token);
	AmministratoreScuola findByUsername(String username);
}
