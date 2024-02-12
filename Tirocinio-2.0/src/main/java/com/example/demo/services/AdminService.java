package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.AmministratoreScuola;
import com.example.demo.repositories.AmministratoreScuolaRepository;

@Service
public class AdminService {

    private final AmministratoreScuolaRepository amministratoreRepository;

    @Autowired
    public AdminService(AmministratoreScuolaRepository amministratoreRepository) {
        this.amministratoreRepository = amministratoreRepository;
    }
    @Transactional
    public AmministratoreScuola createPersona(AmministratoreScuola persona) {
        // Esegui eventuali controlli o elaborazioni prima di salvare la persona
        return amministratoreRepository.save(persona);
    }
}
