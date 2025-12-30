import api from './api'
import { Transaction, CreateTransactionDto } from '../types'

export const transactionService = {
  async getAll(): Promise<Transaction[]> {
    const response = await api.get<Transaction[]>('/transactions')
    return response.data
  },

  async getById(id: number): Promise<Transaction> {
    const response = await api.get<Transaction>(`/transactions/${id}`)
    return response.data
  },

  async create(data: CreateTransactionDto): Promise<Transaction> {
    const response = await api.post<Transaction>('/transactions', data)
    return response.data
  },

  async update(id: number, data: CreateTransactionDto): Promise<Transaction> {
    const response = await api.put<Transaction>(`/transactions/${id}`, data)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/transactions/${id}`)
  },
}
