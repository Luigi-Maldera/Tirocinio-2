package com.example.demo.model;

import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Studente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cognome;
    private Integer eta;
    private String indirizzo;
    private String action;
    private String immagine;
    
    @ManyToOne
    @JoinColumn(name = "classe_id")
    private Classe classe;
    // Altre proprietà e relazioni
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
	public Integer getEta() {
		return eta;
	}
	public void setEta(Integer eta) {
		this.eta = eta;
	}
	public String getIndirizzo() {
		return indirizzo;
	}
	public void setIndirizzo(String indirizzo) {
		this.indirizzo = indirizzo;
	}
	public Classe getClasse() {
		return classe;
	}
	public void setClasse(Classe classe) {
	    if (classe != null) {
	        this.classe = classe;
	    }
	}
	 @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Studente studente = (Studente) o;
        return Objects.equals(id, studente.id);
    }

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
    public String getImmagine() {
        return immagine;
    }

    public void setImmagine(String immagine) {
        this.immagine = immagine;
    }
}
