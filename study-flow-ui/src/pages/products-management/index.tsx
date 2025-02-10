import React, { useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import './index.scss'

function ProductsManagement() {
    const { createProduct } = useProducts()

    // Estado para os dados do formulário
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
    })

    // Estados para feedback do usuário
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Manipulador para atualizar os campos do formulário
    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Manipulador do envio do formulário
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        // Validação simples: verifica se os campos obrigatórios foram preenchidos
        if (!formData.name || !formData.price) {
            setError('Preencha todos os campos obrigatórios.')
            return
        }

        try {
            setLoading(true);

            // Converter o preço para número (ou BigDecimal na API)
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
            }

            await createProduct(payload)

            setSuccess('Produto cadastrado com sucesso!')
            // Limpar o formulário após o cadastro
            setFormData({ name: '', description: '', price: '' })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="register-product">
            <h3>Cadastrar Produto</h3>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nome *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Digite o nome do produto"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Digite a descrição do produto"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Preço *</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        step="0.01"
                        min="0"
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
                </button>
            </form>
        </div>
    );
}

export default ProductsManagement;
