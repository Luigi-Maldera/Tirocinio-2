package com.example.demo.model;

import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Classe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String anno;
    
    @OneToMany(mappedBy = "classe",cascade = CascadeType.ALL,fetch = FetchType.EAGER)    
    @JsonIgnoreProperties("classe")
    private List<ProfessoreScuola> professori;

    @OneToMany(mappedBy = "classe",cascade = CascadeType.ALL)
    @JsonIgnoreProperties("classe")
    private List<Studente> studenti;
    
    //@OneToOne
    //@JoinColumn(name = "coordinatore_id")
    //private CoordinatoreClasse coordinatore;
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

	

	public List<Studente> getStudenti() {
		return studenti;
	}

	public void setStudenti(List<Studente> studenti) {
	    if (studenti == null) {
	        studenti = new ArrayList<>();
	    }
	    this.studenti = studenti;
	}


	public List<ProfessoreScuola> getProfessori() {
		return professori;
	}

	public void setProfessori(List<ProfessoreScuola> professori) {
		this.professori = professori;
	}

	public String getAnno() {
		return anno;
	}

	public void setAnno(String anno) {
		this.anno = anno;
	}

	public void addProfessore(ProfessoreScuola professore) {
        if (this.professori == null) {
            this.professori = new ArrayList<>();
        }
        this.professori.add(professore);
    }

    public void addStudente(Studente studente) {
        if (this.studenti == null) {
            this.studenti = new ArrayList<>();
        }
        this.studenti.add(studente);
    }
    
    public void removeProfessore(ProfessoreScuola professore) {
        if (professori != null) {
            professori.remove(professore);
            professore.setClasse(null);
        }
    }
    
    public void removeStudente(Studente studente) {
    	studenti.remove(studente);
    	studente.setClasse(null);
    }

	/*public CoordinatoreClasse getCoordinatore() {
		return coordinatore;
	}

	public void setCoordinatore(CoordinatoreClasse coordinatore) {
		this.coordinatore = coordinatore;
	}*/
}
