package com.example.demo.services;

import com.example.demo.model.Studente;
import com.example.demo.repositories.StudenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

@Service
public class StudenteService {

    @Autowired
    private StudenteRepository studenteRepository;

    public List<Studente> getAllStudenti() {
        return studenteRepository.findAll();
    }


    public Optional<Studente> getStudenteById(Long id) {
        return studenteRepository.findById(id);
    }

    public Studente createStudente(Studente studente) {
        // Implementa la logica di validazione se necessario
        return studenteRepository.save(studente);
    }

    public Studente updateStudente(Long id, Studente updatedStudente) {
        Optional<Studente> existingStudente = studenteRepository.findById(id);

        if (existingStudente.isPresent()) {
            Studente currentStudente = existingStudente.get();

            // Aggiorna solo i campi non nulli
            if (updatedStudente.getNome() != null) {
                currentStudente.setNome(updatedStudente.getNome());
            }
            if (updatedStudente.getCognome() != null) {
                currentStudente.setCognome(updatedStudente.getCognome());
            }
            if (updatedStudente.getEta() != null) {
                currentStudente.setEta(updatedStudente.getEta());
            }
            if (updatedStudente.getIndirizzo() != null) {
                currentStudente.setIndirizzo(updatedStudente.getIndirizzo());
            }
            if (updatedStudente.getImmagine() != null) {
            	currentStudente.setImmagine(updatedStudente.getImmagine());
            }// Salva lo studente esistente con i nuovi dati
            return studenteRepository.save(currentStudente);
        } else {
            // Lo studente con l'ID specificato non è stato trovato
            // Puoi gestire questa situazione come desideri, ad esempio lanciando un'eccezione
            return null;
        }
    }

    public void deleteStudente(Long id) {
        studenteRepository.deleteById(id);
    }
}
