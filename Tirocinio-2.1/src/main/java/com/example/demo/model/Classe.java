package com.example.demo.model;

import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
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
    
    /*@OneToMany(mappedBy = "classe",cascade = CascadeType.ALL,fetch = FetchType.EAGER)    
    @JsonIgnoreProperties("classe")
    private List<ProfessoreScuola> professori;*/
    
    /*@ManyToMany(mappedBy = "classi")
    @JsonIgnoreProperties("classi")*/
    @ManyToMany
    @JoinTable(
        name = "professore_classe",
        joinColumns = @JoinColumn(name = "classe_id"),
        inverseJoinColumns = @JoinColumn(name = "professore_id")
    )
    @JsonIgnoreProperties("classi")
    private Set<ProfessoreScuola> professori = new HashSet<>();

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
		return studenti != null ? studenti : new ArrayList<>();
	}

	public void setStudenti(List<Studente> studenti) {
	    if (studenti == null) {
	        studenti = new ArrayList<>();
	    }
	    this.studenti = studenti;
	}


	/*public List<ProfessoreScuola> getProfessori() {
		return professori;
	}

	public void setProfessori(List<ProfessoreScuola> professori) {
		this.professori = professori;
	}*/
	
	public Set<ProfessoreScuola> getProfessori() {
        return professori;
    }

    public void setProfessori(Set<ProfessoreScuola> professori) {
        this.professori = professori;
    }

	public String getAnno() {
		return anno;
	}

	public void setAnno(String anno) {
		this.anno = anno;
	}


    public void addStudente(Studente studente) {
        if (this.studenti == null) {
            this.studenti = new ArrayList<>();
        }
        this.studenti.add(studente);
    }
    
    public void addProfessori(ProfessoreScuola professore) {
        // Assicurati che la lista dei professori non sia nulla
        if (professori == null) {
            professori = new HashSet<>();
        }
        // Aggiungi il professore alla lista solo se non è già presente
        if (!professori.contains(professore)) {
            professori.add(professore);
            // Aggiungi la classe al professore
            professore.addClassi(this);
        }
    }
    
    
    public void removeStudente(Studente studente) {
    	studenti.remove(studente);
    	studente.setClasse(null);
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Classe other = (Classe) o;
        return Objects.equals(id, other.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

	/*public CoordinatoreClasse getCoordinatore() {
		return coordinatore;
	}

	public void setCoordinatore(CoordinatoreClasse coordinatore) {
		this.coordinatore = coordinatore;
	}*/
}
