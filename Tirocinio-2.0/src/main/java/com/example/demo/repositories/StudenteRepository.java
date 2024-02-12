package com.example.demo.repositories;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.Studente;

public interface StudenteRepository extends JpaRepository<Studente, Long> {
	boolean existsByNomeAndCognome(String nome, String cognome);

	@Transactional
    @Modifying
    @Query("UPDATE Studente s SET s.classe = null WHERE s.id = :studenteId")
    void updateClasseReferenceToNull(Long studenteId);
}

