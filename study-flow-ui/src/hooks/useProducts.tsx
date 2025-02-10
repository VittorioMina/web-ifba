import { useState, useCallback } from 'react'
import axios from 'axios'
import { Product } from '../models/product'

const BASE_URL = 'http://localhost:8080/api/products'

export const useProducts = () => {
    const [loading, setLoading] = useState(false)

    const createProduct = useCallback(async (product: Product) => {
        setLoading(true)
        try {
            const response = await axios.post(BASE_URL, product)
            return response.data
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    const getProduct = useCallback(async (id: string) => {
        setLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/${id}`)
            return response.data
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    const updateProduct = useCallback(async (id: string, product: Product) => {
        setLoading(true)
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, product)
            return response.data
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    const deleteProduct = useCallback(async (id: string) => {
        setLoading(true)
        try {
            await axios.delete(`${BASE_URL}/${id}`)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    const getProductsPaginated = useCallback(async (page = 0, size = 10) => {
        setLoading(true)
        try {
            const response = await axios.get(BASE_URL, { params: { page, size } })
            return response.data
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        loading,
        createProduct,
        getProduct,
        updateProduct,
        deleteProduct,
        getProductsPaginated,
    }
};
