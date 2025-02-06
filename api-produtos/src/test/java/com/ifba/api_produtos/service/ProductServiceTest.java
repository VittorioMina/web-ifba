package com.ifba.api_produtos.service;

import com.ifba.api_produtos.dto.ProductDTO;
import com.ifba.api_produtos.exception.ResourceNotFoundException;
import com.ifba.api_produtos.model.Product;
import com.ifba.api_produtos.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductServiceTest {

    @Autowired
    private ProductRepository productRepository;

    // Converter de DTO para Entidade
    private Product convertToEntity(ProductDTO dto) {
        return new Product(dto.getName(), dto.getDescription(), dto.getPrice());
    }

    // Converter de Entidade para DTO
    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(product.getId(), product.getName(), product.getDescription(), product.getPrice());
    }

    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        product = productRepository.save(product);
        return convertToDTO(product);
    }

    @Transactional(readOnly = true)
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com id " + id));
        return convertToDTO(product);
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com id " + id));
        existingProduct.setName(productDTO.getName());
        existingProduct.setDescription(productDTO.getDescription());
        existingProduct.setPrice(productDTO.getPrice());
        productRepository.save(existingProduct);
        return convertToDTO(existingProduct);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com id " + id));
        productRepository.delete(product);
    }

    @Transactional(readOnly = true)
    public Page<ProductDTO> getProductsPaginated(int page, int size) {
        Page<Product> productPage = productRepository.findAll(PageRequest.of(page, size));
        return productPage.map(this::convertToDTO);
    }
}
