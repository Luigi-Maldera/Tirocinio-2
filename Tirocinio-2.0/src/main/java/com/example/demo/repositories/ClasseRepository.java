package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Classe;

public interface ClasseRepository extends JpaRepository<Classe, Long> {
	boolean existsByNome(String nome);
}

