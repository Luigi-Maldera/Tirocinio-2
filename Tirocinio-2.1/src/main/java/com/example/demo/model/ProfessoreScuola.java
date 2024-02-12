package com.example.demo.model;

import java.util.*;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.InheritanceType;
import javax.persistence.DiscriminatorType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
//@Table(name = "Professore_Scuola")
//@Inheritance(strategy = InheritanceType.JOINED)
//@DiscriminatorColumn(name = "dtype", discriminatorType = DiscriminatorType.STRING)
public class ProfessoreScuola {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cognome;
    private Integer eta;
    private String indirizzo;
    private String materia;
    private String action;
    // Altre proprietà e relazioni
    
    @ManyToOne
    @JoinColumn(name = "classe_id")
    private Classe classe;
    
    /*@Column(name = "is_coordinatore")
    private Boolean isCoordinatore;*/

	public Integer getEta() {
		return eta;
	}

	public void setEta(Integer eta) {
		this.eta = eta;
	}

	public Classe getClasse() {
		return classe;
	}

	public void setClasse(Classe classe) {
        // Aggiungi la logica per gestire solo gli attributi specifici che dovrebbero essere modificati
        if (classe != null) {
            this.classe = classe;
        }
    }
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCognome() {
		return cognome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

	public String getIndirizzo() {
		return indirizzo;
	}

	public void setIndirizzo(String indirizzo) {
		this.indirizzo = indirizzo;
	}

	public String getMateria() {
		return materia;
	}

	public void setMateria(String materia) {
		this.materia = materia;
	}
	
	@Override
	public boolean equals(Object o) {
	    if (this == o) return true;
	    if (o == null || getClass() != o.getClass()) return false;
	    ProfessoreScuola professore = (ProfessoreScuola) o;
	    return Objects.equals(id, professore.id);
	}

	// Aggiungiamo il metodo hashCode per garantire la coerenza con equals
	@Override
	public int hashCode() {
	    return Objects.hash(id);
	}
	
	public String getAction() {
	    return action;
	}

	public void setAction(String action) {
	    this.action = action;
	}

	/*public Boolean getIsCoordinatore() {
		return isCoordinatore;
	}

	public void setIsCoordinatore(Boolean isCoordinatore) {
		this.isCoordinatore = isCoordinatore;
	}*/

}

