package com.example.demo.services;

import com.example.demo.model.ProfessoreScuola;
import com.example.demo.repositories.ProfessoreScuolaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfessoreScuolaService {

    @Autowired
    private ProfessoreScuolaRepository professoreRepository;

    public List<ProfessoreScuola> getAllProfessori() {
        return professoreRepository.findAll();
    }

    public Optional<ProfessoreScuola> getProfessoreById(Long id) {
        return professoreRepository.findById(id);
    }

    public ProfessoreScuola createProfessore(ProfessoreScuola professore) {
        // Implementa la logica di validazione se necessario
        return professoreRepository.save(professore);
    }

    public ProfessoreScuola updateProfessore(Long id, ProfessoreScuola professore) {
        Optional<ProfessoreScuola> existingProfessore = professoreRepository.findById(id);

        if (existingProfessore.isPresent()) {
            ProfessoreScuola updatedProfessore = existingProfessore.get();

            // Aggiorna solo i campi non nulli
            if (professore.getNome() != null) {
                updatedProfessore.setNome(professore.getNome());
            }
            if (professore.getCognome() != null) {
                updatedProfessore.setCognome(professore.getCognome());
            }
            if (professore.getEta() != null) {
                updatedProfessore.setEta(professore.getEta());
            }
            if (professore.getIndirizzo() != null) {
                updatedProfessore.setIndirizzo(professore.getIndirizzo());
            }
            if (professore.getMateria() != null) {
                updatedProfessore.setMateria(professore.getMateria());
            }
            // Aggiungi altri campi che desideri aggiornare

            // Salva il professore esistente con i nuovi dati
            return professoreRepository.save(updatedProfessore);
        } else {
            // Il professore con l'ID specificato non è stato trovato
            // Puoi gestire questa situazione come desideri, ad esempio lanciando un'eccezione
            return null;
        }
    }


    public void deleteProfessore(Long id) {
        professoreRepository.deleteById(id);
    }
}
