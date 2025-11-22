import axios from 'axios';
import type { Car, DraftCar } from '../types';

// Configura la URL base de tu API
const API_BASE_URL = 'https://car-data.p.rapidapi.com';
const API_KEY = '8bbdf27184mshc95e28846468372p117dc3jsn3d821ae4d4d9'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'car-data.p.rapidapi.com',
    'x-rapidapi-key': API_KEY
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
export const searchCars = async (criteria: FormData): Promise<Car[]> => {
  try {
    const response = await apiClient.get('/cars/search', { params: criteria });
    return response.data;
  } catch (error) {
    console.error('Error searching cars:', error);
    throw error;
  }
};

export const carApi = {
  getBrands: async () => {
    try {
      const response = apiClient.get(`/cars/makes`);
      if (!response) throw new Error('Failed to fetch brands');
      console.log((await response).data)
      return (await response).data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  },

  getModels: async (maker: string) => {
    try {
      const response = await apiClient.get(`/cars?make=${maker}&limit=10`);
      if (!response) throw new Error('Failed to fetch models');
      console.log('response models' + JSON.stringify(response.data.models.model))
      //return response;
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  },
};
