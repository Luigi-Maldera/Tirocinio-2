package com.example.demo.repositories;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.Classe;
import com.example.demo.model.ProfessoreScuola;

public interface ProfessoreScuolaRepository extends JpaRepository<ProfessoreScuola, Long> {
	boolean existsByNomeAndCognome(String nome, String cognome);

	@Transactional
    @Modifying
    @Query("UPDATE ProfessoreScuola p SET p.classe = null WHERE p.id = :professoreId")
    void updateClasseReferenceToNull(Long professoreId);
}

