package com.ifba.api_produtos.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ifba.api_produtos.dto.ProductDTO;
import com.ifba.api_produtos.service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.math.BigDecimal;
import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    // Para converter objetos em JSON
    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProductService productService;

    @Test
    public void testCreateProduct_success() throws Exception {
        ProductDTO inputDTO = new ProductDTO(null, "Produto 1", "Descrição 1", BigDecimal.valueOf(100));
        ProductDTO savedDTO = new ProductDTO(1L, "Produto 1", "Descrição 1", BigDecimal.valueOf(100));

        Mockito.when(productService.createProduct(any(ProductDTO.class))).thenReturn(savedDTO);

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inputDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Produto 1"))
                .andExpect(jsonPath("$.description").value("Descrição 1"))
                // Note que o jsonPath para price pode ser um número; dependendo do mapeamento, ajuste se necessário.
                .andExpect(jsonPath("$.price").value(100));
    }

    @Test
    public void testCreateProduct_invalid() throws Exception {
        // Teste para validação: nome em branco e preço negativo
        ProductDTO invalidDTO = new ProductDTO(null, "", "Descrição", BigDecimal.valueOf(-10));

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.name").value("O nome é obrigatório"))
                .andExpect(jsonPath("$.price").value("O preço deve ser maior que zero"));
    }

    @Test
    public void testGetProduct_success() throws Exception {
        Long productId = 1L;
        ProductDTO productDTO = new ProductDTO(productId, "Produto 1", "Descrição 1", BigDecimal.valueOf(100));

        Mockito.when(productService.getProductById(productId)).thenReturn(productDTO);

        mockMvc.perform(get("/api/products/{id}", productId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(productId))
                .andExpect(jsonPath("$.name").value("Produto 1"));
    }

    @Test
    public void testUpdateProduct_success() throws Exception {
        Long productId = 1L;
        ProductDTO inputDTO = new ProductDTO(null, "Produto Atualizado", "Descrição Atualizada", BigDecimal.valueOf(150));
        ProductDTO updatedDTO = new ProductDTO(productId, "Produto Atualizado", "Descrição Atualizada", BigDecimal.valueOf(150));

        Mockito.when(productService.updateProduct(eq(productId), any(ProductDTO.class))).thenReturn(updatedDTO);

        mockMvc.perform(put("/api/products/{id}", productId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inputDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(productId))
                .andExpect(jsonPath("$.name").value("Produto Atualizado"));
    }

    @Test
    public void testDeleteProduct_success() throws Exception {
        Long productId = 1L;
        // O método deleteProduct não retorna nada; basta simular que nada ocorre.
        Mockito.doNothing().when(productService).deleteProduct(productId);

        mockMvc.perform(delete("/api/products/{id}", productId))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testGetProductsPaginated_success() throws Exception {
        ProductDTO product1 = new ProductDTO(1L, "Produto 1", "Descrição 1", BigDecimal.valueOf(100));
        ProductDTO product2 = new ProductDTO(2L, "Produto 2", "Descrição 2", BigDecimal.valueOf(200));
        Page<ProductDTO> page = new PageImpl<>(Arrays.asList(product1, product2));

        Mockito.when(productService.getProductsPaginated(0, 10)).thenReturn(page);

        mockMvc.perform(get("/api/products")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content[0].id").value(1L))
                .andExpect(jsonPath("$.content[1].id").value(2L));
    }
}
