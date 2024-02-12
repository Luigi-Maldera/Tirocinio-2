package com.example.demo.controllers;

import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Classe;
import com.example.demo.model.ProfessoreScuola;
import com.example.demo.model.Studente;
import com.example.demo.repositories.ClasseRepository;
import com.example.demo.repositories.ProfessoreScuolaRepository;
import com.example.demo.repositories.StudenteRepository;
import com.example.demo.services.ClasseService;
import com.example.demo.services.ProfessoreScuolaService;
import com.example.demo.services.StudenteService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@RestController
@RequestMapping("/api")
public class SchoolController {
	private static final Logger log = LoggerFactory.getLogger(SchoolController.class);
    @Autowired
    private ProfessoreScuolaService professoreScuolaService;

    @Autowired
    private ClasseService classeService;

    @Autowired
    private StudenteService studenteService;
    
    private final ObjectMapper objectMapper;
    
    @Autowired
    public SchoolController(ClasseService classeService, ProfessoreScuolaService professoreScuolaService, StudenteService studenteService,ObjectMapper objectMapper) {
        this.classeService = classeService;
        this.professoreScuolaService = professoreScuolaService;
        this.studenteService = studenteService;
        this.objectMapper = objectMapper;
        this.objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        log.error("Errore durante l'esecuzione della richiesta", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }

// 											Creare classi service per ogni modello
 // API per CRUD di Professore
    @GetMapping("/professori")
    public List<ProfessoreScuola> getProfessori() {
        return professoreScuolaService.getAllProfessori();
    }

    @GetMapping("/professori/{id}")
    public ProfessoreScuola getProfessore(@PathVariable Long id) {
        return professoreScuolaService.getProfessoreById(id).orElse(null);
    }

   /* @PostMapping("/professori")
    public ProfessoreScuola createProfessore(@RequestBody ProfessoreScuola professore) {
        return professoreRepository.save(professore);
    }*/
    
    @PostMapping("/professori")
    public ResponseEntity<?> createProfessore(@RequestBody ProfessoreScuola professore) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(professoreScuolaService.createProfessore(professore));
        } catch (Exception e) {
            log.error("Errore durante la creazione del professore", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore interno del server");
        }
    }

    @PutMapping("/professori/{id}")
    public ProfessoreScuola updateProfessore(@PathVariable Long id, @RequestBody ProfessoreScuola professore) {
        return professoreScuolaService.updateProfessore(id, professore);
    }

    @DeleteMapping("/professori/{id}")
    public void deleteProfessore(@PathVariable Long id) {
        professoreScuolaService.deleteProfessore(id);
    }

    
 // API per CRUD di Classe
    @GetMapping("/classi")
    public List<Classe> getClassi() {
        return classeService.getAllClassi();
    }

    @GetMapping("/classi/{id}")
    public Classe getClasse(@PathVariable Long id) {
        return classeService.getClasseById(id).orElse(null);
    }

    @PostMapping("/classi")
    public ResponseEntity<?> createClasse(@RequestBody Classe classe) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(classeService.createClasse(classe));
        } catch (Exception e) {
            log.error("Errore durante la creazione della classe", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore interno del server");
        }
    }
    @Transactional
    @PutMapping("/classi/{id}")
    public Classe updateClasse(@PathVariable Long id, @RequestBody Classe classe) {
        return classeService.updateClasse(id, classe);
    }

    @DeleteMapping("/classi/{id}")
    public void deleteClasse(@PathVariable Long id) {
        classeService.deleteClasse(id);
    }

 // API per CRUD di Studente
    @GetMapping("/studenti")
    public List<Studente> getStudenti() {
        return studenteService.getAllStudenti();
    }

    @GetMapping("/studenti/{id}")
    public Studente getStudente(@PathVariable Long id) {
        return studenteService.getStudenteById(id).orElse(null);
    }

    @PostMapping("/studenti")
    public ResponseEntity<?> createStudente(@RequestBody Studente studente) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(studenteService.createStudente(studente));
        } catch (Exception e) {
            log.error("Errore durante la creazione dello studente", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore interno del server");
        }
    }

    @PutMapping("/studenti/{id}")
    public Studente updateStudente(@PathVariable Long id, @RequestBody Studente studente) {
        return studenteService.updateStudente(id, studente);
    }

    @DeleteMapping("/studenti/{id}")
    public void deleteStudente(@PathVariable Long id) {
        studenteService.deleteStudente(id);
    }
    

    /*@Transactional
    @PostMapping("/assegna-coordinatore/{professoreId}/{classeId}")
    public void assegnaCoordinatore(@PathVariable Long professoreId, @PathVariable Long classeId) {
        classeService.assegnaCoordinatore(professoreId, classeId);
    }

    @PostMapping("/rimuovi-coordinatore/{classeId}")
    public ResponseEntity<String> rimuoviCoordinatoreDaClasse(@PathVariable Long classeId) {
        try {
            classeService.rimuoviCoordinatore(classeId);
            return ResponseEntity.ok("Coordinatore rimosso dalla classe con successo.");
        } catch (Exception e) {
            log.error("Errore durante la rimozione del coordinatore dalla classe", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore interno del server");
        }
    }*/

}


