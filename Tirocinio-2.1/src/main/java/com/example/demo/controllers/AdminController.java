package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.AmministratoreScuola;
import com.example.demo.services.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService personaService;

    @Autowired
    public AdminController(AdminService personaService) {
        this.personaService = personaService;
    }
    
    @PostMapping("/create")
    @Transactional
    public ResponseEntity<AmministratoreScuola> createPersona(@RequestBody AmministratoreScuola persona) {
    	AmministratoreScuola createdPersona = personaService.createPersona(persona);
        return new ResponseEntity<>(createdPersona, HttpStatus.CREATED);
    }
}
