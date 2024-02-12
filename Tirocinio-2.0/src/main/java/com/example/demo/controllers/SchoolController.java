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
    
 // API per assegnazione di Professore a Classe
 /*   @PostMapping("/assegna-professore/{professoreId}/{classeId}")
    public ResponseEntity<String> assegnaProfessoreAClasse(@PathVariable Long professoreId, @PathVariable Long classeId) {
        try {
            ProfessoreScuola professore = professoreRepository.findById(professoreId).orElse(null);
            Classe classe = classeRepository.findById(classeId).orElse(null);

            if (professore != null && classe != null) {
                if (classe.getProfessore() == null) {
                    classe.setProfessore(professore);
                    classeRepository.save(classe);
                    return ResponseEntity.ok("Professore assegnato alla classe con successo.");
                } else {
                    return ResponseEntity.badRequest().body("La classe ha già un professore assegnato.");
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Errore durante l'assegnazione del professore alla classe", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore interno del server");
        }
    }
    
 // API per assegnazione di Studente a Classe
    @PostMapping("/assegna-studente/{studenteId}/{classeId}")
    public ResponseEntity<String> assegnaStudenteAClasse(@PathVariable Long studenteId, @PathVariable Long classeId) {
        try {
            Studente studente = studenteRepository.findById(studenteId).orElse(null);
            Classe classe = classeRepository.findById(classeId).orElse(null);

            if (studente != null && classe != null) {
                List<Studente> studenti = classe.getStudenti();
                if (!studenti.contains(studente)) {
                    studenti.add(studente);
                    classe.setStudenti(studenti);
                    classe = classeRepository.save(classe);
                    studente.setClasse(classe);
                    studenteRepository.save(studente);
                    return ResponseEntity.ok("Studente assegnato alla classe con successo. Classe ID: " + classe.getId());
                } else {
                    return ResponseEntity.badRequest().body("Lo studente è già assegnato alla classe.");
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Errore durante l'assegnazione dello studente alla classe", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore interno del server");
        }
    }

    // API per disassegnare Professore a Classe
    @PostMapping("/disassegna-professore/{classeId}")
    public ResponseEntity<String> disassegnaProfessoreDaClasse(@PathVariable Long classeId) {
        try {
            Classe classe = classeRepository.findById(classeId).orElse(null);

            if (classe != null) {
                classe.setProfessore(null);
                classeRepository.save(classe);
                return ResponseEntity.ok("Professore disassegnato dalla classe con successo.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Errore durante la disassegnazione del professore dalla classe", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore interno del server");
        }
    }

    @PostMapping("/disassegna-studente/{studenteId}/{classeId}")
    public ResponseEntity<String> disassegnaStudenteDaClasse(@PathVariable Long studenteId, @PathVariable Long classeId) {
        try {
            Studente studente = studenteRepository.findById(studenteId).orElse(null);
            Classe classe = classeRepository.findById(classeId).orElse(null);

            if (studente != null && classe != null) {
                List<Studente> studenti = classe.getStudenti();
                studenti.remove(studente);
                classe.setStudenti(studenti);
                classeRepository.save(classe);
                // Rimuovi il riferimento alla classe nello studente
                studente.setClasse(null);
                studenteRepository.save(studente);

                return ResponseEntity.ok("Studente disassegnato dalla classe con successo.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Errore durante la disassegnazione dello studente dalla classe", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore interno del server");
        }
    }


   */ // Implementa le API per CRUD e assegnazioni
    // Assicurati di aggiungere la sicurezza per consentire l'accesso solo agli amministratori
}


