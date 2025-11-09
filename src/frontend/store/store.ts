import { create } from "zustand";
import type { Car, DraftCar } from "../types";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

type CarState = {
    cars: Car[];
    activeId: Car["id"];
    addCar: (data: DraftCar) => void;
    deleteCar: (id: Car["id"]) => void;
    getCarById: (id: Car["id"]) => void;
    updateCar: (id: Car["id"], data: DraftCar) => void;
};
const createCar = (car: DraftCar): Car => {
    return {
        ...car,
        id: uuidv4(),
    };
};
export const useCarStore = create<CarState>()(
    devtools(
        persist(
            (set) => ({
                cars: [],
                activeId: "",
                addCar: (data: DraftCar) =>
                    set((state) => ({
                        cars: [...state.cars, createCar(data)],
                    })),
                deleteCar: (id) =>
                    set((state) => ({
                        cars: state.cars.filter((car) => car.id !== id),
                    })),
                getCarById: (id) => {
                    set(() => ({
                        activeId: id,
                    }));
                },
                updateCar: (id, data) =>
                    set((state) => ({
                        cars: state.cars.map((car) =>
                            car.id === id ? { ...car, ...data } : car
                        ),

                    })),
            }),
            {
                name: "car-storage",
            }
        )
    )
);  