import type { Car } from "../../types";

interface FavoritesItemProps {
  car: Car;
  isDark: boolean;
  onRemove: (carId: string) => void;
}

export default function FavoritesItem({ car, isDark, onRemove }: FavoritesItemProps) {
  return (
    <div
      className={`${
        isDark ? "bg-gray-700" : "bg-gray-100"
      } rounded-lg p-6 transition-colors duration-300`}
    >
      <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
        {car.brand} {car.model}
      </h3>
      <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
        Year: {car.year}
      </p>
      <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
        Price: ${car.price}
      </p>
      <button
        onClick={() => onRemove(car.id)}
        className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition transform hover:scale-105"
      >
        Remove from Favorites
      </button>
    </div>
  );
}
