import CarForm from "./Car/CarForm";
import CarList from "./Car/CarList";
import { useCarStore } from "../store/store";
import { useState } from "react";

interface BuyComponentProps {
  isDark: boolean;
}


export default function BuyComponent({ isDark }: BuyComponentProps) {
  const { cars, searchCarsAction } = useCarStore();
  const [isSearchDone, setIsSearchDone] = useState(false);

  const handleSearchCar = async (carsValues: FormData) => {
    await searchCarsAction(carsValues);
    setIsSearchDone(true);
  }
  return (
    <div
      className={`w-full min-h-screen p-8 transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      <div
        className={`${
          isDark ? "bg-gray-800" : "bg-white"
        } rounded-2xl shadow-2xl p-12 transition-colors duration-300`}
      >
        <h1
          className={`text-4xl font-bold mb-6 transition-colors duration-300 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Buy a Car
        </h1>
        <p
          className={`text-lg transition-colors duration-300 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Browse our extensive collection of cars available for purchase.
        </p>
        {isSearchDone ? (
          <div className="mt-8">
            {cars.length > 0 ? (
              <CarList cars={cars} isDark={isDark} />
            ) : (
              <p
                className={`text-center mt-6 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No cars found matching your criteria.
              </p>
            )}
          </div>
        ) : (
          <CarForm isDark={isDark}/>
        )}
      </div>
    </div>
  );
}
