package com.example.demo.services;

import com.example.demo.model.AmministratoreScuola;
import com.example.demo.repositories.AmministratoreScuolaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Service
public class AuthenticationService {

    private final AmministratoreScuolaRepository personaRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationService(AmministratoreScuolaRepository personaRepository, PasswordEncoder passwordEncoder) {
        this.personaRepository = personaRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        AmministratoreScuola user = personaRepository.findByUsername(username);

        if (user == null || !password.equals(user.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
    }

    public AmministratoreScuola loadUserByUsername(String username) throws UsernameNotFoundException {
        return personaRepository.findByUsername(username);
    }
}
