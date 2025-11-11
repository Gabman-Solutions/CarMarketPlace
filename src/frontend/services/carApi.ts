import axios from 'axios';
import type { Car, DraftCar } from '../types';

// Configura la URL base de tu API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.api-ninjas.com/v1/';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key':`${API_TOKEN}`,
  },
});

/**
 * Fetch all cars from the API
 */
export const fetchCars = async (): Promise<Car[]> => {
  try {
    const response = await apiClient.get('/cars');
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

/**
 * Fetch a single car by ID
 */
export const fetchCarById = async (id: string): Promise<Car> => {
  try {
    const response = await apiClient.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching car ${id}:`, error);
    throw error;
  }
};
/**
 * Get list of car makers
 */
export const fetchCarMakers = async (): Promise<string[]> => {
    try {   
        const response = await apiClient.get('/makers');
        return response.data;
    } catch (error) {
        console.error('Error fetching car makers:', error);
        throw error;
    }

}

export const fetchCarModels = async (maker : string): Promise<string[]> => {
    try {   
        const response = await apiClient.get('/carmodels?make=' + maker);
        return response.data;
    } catch (error) {
        console.error('Error fetching car makers:', error);
        throw error;
    }

}

/**
 * Create a new car
 */
export const createCar = async (data: DraftCar): Promise<Car> => {
  try {
    const response = await apiClient.post('/cars', data);
    return response.data;
  } catch (error) {
    console.error('Error creating car:', error);
    throw error;
  }
};

/**
 * Update an existing car
 */
export const updateCarApi = async (id: string, data: DraftCar): Promise<Car> => {
  try {
    const response = await apiClient.put(`/cars/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating car ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a car by ID
 */
export const deleteCarApi = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/cars/${id}`);
  } catch (error) {
    console.error(`Error deleting car ${id}:`, error);
    throw error;
  }
};

/**
 * Search cars by criteria (brand, model, year, price)
 */
export const searchCars = async (criteria: Partial<DraftCar>): Promise<Car[]> => {
  try {
    const response = await apiClient.get('/cars/search', { params: criteria });
    return response.data;
  } catch (error) {
    console.error('Error searching cars:', error);
    throw error;
  }
};
