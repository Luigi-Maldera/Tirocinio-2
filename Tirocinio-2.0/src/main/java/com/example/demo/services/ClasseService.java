package com.example.demo.services;

import com.example.demo.model.Classe;
import com.example.demo.model.ProfessoreScuola;
import com.example.demo.model.Studente;
import com.example.demo.repositories.ClasseRepository;
import com.example.demo.repositories.ProfessoreScuolaRepository;
import com.example.demo.repositories.StudenteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

            // Log professori input data
            List<ProfessoreScuola> professori = updatedClasse.getProfessori();
            if (professori != null) {
                System.out.println("Input Professori: " + professori.toString());
            }

            // Aggiungi professori alla classe
            if (professori != null) {
                for (ProfessoreScuola professore : professori) {
                    // Verifica se il professore ha un ID valido
                    if (professore.getId() != null) {
                        ProfessoreScuola existingProfessore = professoreRepository.findById(professore.getId()).orElse(null);
                        if (existingProfessore != null && !currentClasse.getProfessori().contains(existingProfessore)) {
                            // Copia solo i campi non nulli dalla richiesta al professore esistente
                            if (professore.getNome() != null) {
                                existingProfessore.setNome(professore.getNome());
                            }
                            if (professore.getCognome() != null) {
                                existingProfessore.setCognome(professore.getCognome());
                            }
                            if (professore.getEta() != null) {
                                existingProfessore.setEta(professore.getEta());
                            }
                            if (professore.getIndirizzo() != null) {
                                existingProfessore.setIndirizzo(professore.getIndirizzo());
                            }
                            if (professore.getMateria() != null) {
                                existingProfessore.setMateria(professore.getMateria());
                            }
                            // Altre proprietà...
                            // Aggiungi il professore esistente alla lista della classe
                            currentClasse.addProfessore(existingProfessore);
                            existingProfessore.setClasse(currentClasse);

                        }
                    } else {
                        // Se il professore non ha un ID valido, aggiungilo direttamente alla classe
                        professore.setClasse(currentClasse);
                        currentClasse.addProfessore(professore);

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
            List<ProfessoreScuola> professoriToRemove = updatedClasse.getProfessori().stream()
                    .filter(professore -> "remove".equalsIgnoreCase(professore.getAction()))
                    .collect(Collectors.toList());
            for (ProfessoreScuola professoreToRemove : professoriToRemove) {
                professoreToRemove.setClasse(null);
                //professoreRepository.save(professoreToRemove);
                currentClasse.removeProfessore(professoreToRemove);	// Rimuovi l'associazione con la classe
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

            // Aggiorna manualmente le associazioni bidirezionali per i professori rimossi
            for (ProfessoreScuola professore : professoriToRemove) {
                professoreRepository.updateClasseReferenceToNull(professore.getId());
            }

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


}
