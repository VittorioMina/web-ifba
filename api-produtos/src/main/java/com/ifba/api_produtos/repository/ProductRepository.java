package com.ifba.api_produtos.repository;

import com.ifba.api_produtos.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Métodos de consulta adicionais, se necessário.
}