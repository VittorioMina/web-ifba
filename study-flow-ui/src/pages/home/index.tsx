import React, { useState, useEffect } from 'react'
import { useProducts } from '../../hooks/useProducts'
import './index.scss'
import { Product } from '../../models/product'

function Home() {
    const { loading, getProductsPaginated } = useProducts()
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Buscando a primeira página com 10 produtos
                const data = await getProductsPaginated(0, 10)
                // Considerando que a API retorne os produtos no campo "content"
                setProducts(data.content || [])
            } catch (error) {
                console.error(error)
            }
        }

        fetchProducts()
    }, [getProductsPaginated])

    return (
        <div className="content">
            <h3>Lista de Produtos</h3>

            {loading &&
                <p>Carregando produtos...</p>
            }

            {!loading && products.length === 0 &&
                <p>Nenhum produto encontrado.</p>
            }

            <ul className="product-list">
                {products.map((product) => (
                    <li key={product.id} className="product-item">
                        <h4>{product.name}</h4>
                        {product.description && <p>{product.description}</p>}
                        <span>Preço: R$ {product.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home
