package com.example.demo.services;

import com.example.demo.model.Classe;
//import com.example.demo.model.CoordinatoreClasse;
import com.example.demo.model.ProfessoreScuola;
import com.example.demo.model.Studente;
import com.example.demo.repositories.ClasseRepository;
import com.example.demo.repositories.ProfessoreScuolaRepository;
import com.example.demo.repositories.StudenteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Service
public class ClasseService {

    @Autowired
    private ClasseRepository classeRepository;
    
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ProfessoreScuolaRepository professoreRepository;

    @Autowired
    private StudenteRepository studenteRepository;

    public List<Classe> getAllClassi() {
        return classeRepository.findAll();
    }

    public Optional<Classe> getClasseById(Long id) {
        return classeRepository.findById(id);
    }

    public Classe createClasse(Classe classe) {
        return classeRepository.save(classe);
    }

    public void deleteClasse(Long id) {
        classeRepository.deleteById(id);
    }
    
    @Transactional
    public Classe updateClasse(Long id, Classe updatedClasse) {
        Optional<Classe> existingClasse = classeRepository.findById(id);

        if (existingClasse.isPresent()) {
            Classe currentClasse = existingClasse.get();

            // Aggiorna solo i campi non nulli
            if (updatedClasse.getNome() != null) {
                currentClasse.setNome(updatedClasse.getNome());
            }
            if (updatedClasse.getAnno() != null) {
                currentClasse.setAnno(updatedClasse.getAnno());
            }
            
         // Aggiungi professori alla classe
         Set<ProfessoreScuola> professori = updatedClasse.getProfessori();
         if (professori != null) {
             // Aggiungi i nuovi professori alla lista esistente
             currentClasse.getProfessori().addAll(professori);
             for (ProfessoreScuola professore : professori) {
                 // Aggiungi la classe al professore solo se non è già presente
                 if (!professore.getClassi().contains(currentClasse)) {
                     professore.addClassi(currentClasse);
                     currentClasse.addProfessori(professore);
                 }
             }
         }

            
            
            // Log studenti input data
            List<Studente> studenti = updatedClasse.getStudenti();
            if (studenti != null) {
                System.out.println("Input Studenti: " + studenti.toString());
            }

            // Aggiungi studenti alla classe
            if (studenti != null) {
                for (Studente studente : studenti) {
                    // Verifica se lo studente ha un ID valido
                    if (studente.getId() != null) {
                        Studente existingStudente = studenteRepository.findById(studente.getId()).orElse(null);
                        if (existingStudente != null && !currentClasse.getStudenti().contains(existingStudente)) {
                            // Copia solo i campi non nulli dalla richiesta allo studente esistente
                            if (studente.getNome() != null) {
                                existingStudente.setNome(studente.getNome());
                            }
                            if (studente.getCognome() != null) {
                                existingStudente.setCognome(studente.getCognome());
                            }
                            if (studente.getEta() != null) {
                                existingStudente.setEta(studente.getEta());
                            }
                            if (studente.getIndirizzo() != null) {
                                existingStudente.setIndirizzo(studente.getIndirizzo());
                            }
                            // Altre proprietà...
                            // Aggiungi lo studente esistente alla lista della classe
                            currentClasse.addStudente(existingStudente);
                            existingStudente.setClasse(currentClasse);

                        }
                    } else {
                        // Se lo studente non ha un ID valido, aggiungilo direttamente alla classe
                        studente.setClasse(currentClasse);
                        currentClasse.addStudente(studente);

                    }
                }
            }

         // Rimuovi professori dalla classe
            Set<ProfessoreScuola> professoriToRemove = updatedClasse.getProfessori().stream()
                    .filter(professore -> "remove".equalsIgnoreCase(professore.getAction()))
                    .collect(Collectors.toSet());
            for (ProfessoreScuola professoreToRemove : professoriToRemove) {
                professoreToRemove.removeClassi(currentClasse); // Rimuovi la classe dal professore
            }
            currentClasse.getProfessori().removeAll(professoriToRemove);

            // Rimuovi studenti dalla classe
            List<Studente> studentiToRemove = updatedClasse.getStudenti().stream()
                    .filter(studente -> "remove".equalsIgnoreCase(studente.getAction()))
                    .collect(Collectors.toList());
            for (Studente studenteToRemove : studentiToRemove) {
                studenteToRemove.setClasse(null);
                //studenteRepository.save(studenteToRemove);
                currentClasse.removeStudente(studenteToRemove);// Rimuovi l'associazione con la classe
            }
            currentClasse.getStudenti().removeAll(studentiToRemove);

         // Salva la classe esistente con i nuovi dati
            Classe savedClasse = classeRepository.save(currentClasse);


            // Aggiorna manualmente le associazioni bidirezionali per gli studenti rimossi
            for (Studente studente : studentiToRemove) {
                studenteRepository.updateClasseReferenceToNull(studente.getId());
            }
            

            return savedClasse;
        } else {
            // La classe con l'ID specificato non è stata trovata
            // Puoi gestire questa situazione come desideri, ad esempio lanciando un'eccezione
            return null;
        }
    }
    
    

    /*@Transactional
    public void assegnaCoordinatore(Long professoreId, Long classeId) {
        // Recupera il professore dalla repository
        ProfessoreScuola coordinatore = professoreRepository.findById(professoreId)
                .orElseThrow(() -> new RuntimeException("Professore non trovato con ID: " + professoreId));

        // Imposta il coordinatore
        CoordinatoreClasse coordinatoreClasse = new CoordinatoreClasse();
        coordinatoreClasse.setClasse(classeRepository.findById(classeId)
                .orElseThrow(() -> new RuntimeException("Classe non trovata con ID: " + classeId)));

        // Salva il coordinatore nel database
        professoreRepository.save(coordinatoreClasse);
    }



    @Transactional
    public void rimuoviCoordinatore(Long classeId) {
        Classe classe = classeRepository.findById(classeId).orElse(null);

        if (classe != null && classe.getCoordinatore() != null) {
            CoordinatoreClasse coordinatore = classe.getCoordinatore();
            classe.setCoordinatore(null);
            coordinatore.setClasse(null);
            classeRepository.save(classe);
            professoreRepository.save(coordinatore);
        }
    }*/



}
