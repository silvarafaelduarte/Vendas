package io.github.silvarafaelduarte.vendasapi.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.silvarafaelduarte.vendasapi.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{
    
}
