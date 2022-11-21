package io.github.silvarafaelduarte.vendasapi.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.silvarafaelduarte.vendasapi.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
}
