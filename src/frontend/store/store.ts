import { create } from "zustand";
import type { Car, DraftCar } from "../types";
import { devtools, persist } from "zustand/middleware";
import { 
  fetchCars, 
  fetchCarById, 
  createCar as createCarApi, 
  updateCarApi, 
  deleteCarApi,
  searchCars
} from "../services/carApi";

type CarState = {
    cars: Car[];
    activeId: Car["id"] | "";
    isLoading: boolean;
    error: string | null;
    
    // Async actions
    fetchAllCars: () => Promise<void>;
    searchCarsAction: (criteria: Partial<DraftCar>) => Promise<void>;
    addCar: (data: DraftCar) => Promise<void>;
    deleteCar: (id: Car["id"]) => Promise<void>;
    getCarById: (id: Car["id"]) => Promise<void>;
    updateCar: (id: Car["id"], data: DraftCar) => Promise<void>;
};
export const useCarStore = create<CarState>()(
    devtools(
        persist(
            (set) => ({
                cars: [],
                activeId: "",
                isLoading: false,
                error: null,
                
                // Fetch all cars
                fetchAllCars: async () => {
                    set({ isLoading: true, error: null });
                    try {
                        const cars = await fetchCars();
                        set({ cars, isLoading: false });
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Error fetching cars';
                        set({ error: errorMessage, isLoading: false });
                    }
                },
                
                // Search cars by criteria
                searchCarsAction: async (criteria: Partial<DraftCar>) => {
                    set({ isLoading: true, error: null });
                    try {
                        const cars = await searchCars(criteria);
                        set({ cars, isLoading: false });
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Error searching cars';
                        set({ error: errorMessage, isLoading: false });
                    }
                },
                
                // Add a new car
                addCar: async (data: DraftCar) => {
                    set({ isLoading: true, error: null });
                    try {
                        const newCar = await createCarApi(data);
                        set((state) => ({
                            cars: [...state.cars, newCar],
                            isLoading: false,
                        }));
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Error creating car';
                        set({ error: errorMessage, isLoading: false });
                    }
                },
                
                // Delete a car
                deleteCar: async (id: Car["id"]) => {
                    set({ isLoading: true, error: null });
                    try {
                        await deleteCarApi(id);
                        set((state) => ({
                            cars: state.cars.filter((car) => car.id !== id),
                            isLoading: false,
                        }));
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Error deleting car';
                        set({ error: errorMessage, isLoading: false });
                    }
                },
                
                // Get a car by ID
                getCarById: async (id: Car["id"]) => {
                    set({ isLoading: true, error: null });
                    try {
                        await fetchCarById(id);
                        set({ activeId: id, isLoading: false });
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Error fetching car';
                        set({ error: errorMessage, isLoading: false });
                    }
                },
                
                // Update a car
                updateCar: async (id: Car["id"], data: DraftCar) => {
                    set({ isLoading: true, error: null });
                    try {
                        const updatedCar = await updateCarApi(id, data);
                        set((state) => ({
                            cars: state.cars.map((car) =>
                                car.id === id ? updatedCar : car
                            ),
                            isLoading: false,
                        }));
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Error updating car';
                        set({ error: errorMessage, isLoading: false });
                    }
                },
            }),
            {
                name: "car-storage",
            }
        )
    )
);  