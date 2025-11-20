import { useState, useEffect } from "react";
import FavoritesItem from "./FavoritesItem";
import type { Car } from "../../types";
import { useCarStore } from "../../store/store";

interface FavoritesProps {
  isDark: boolean;
}

export default function Favorites({ isDark }: FavoritesProps) {
  const [favorites, setFavorites] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchFavorites = useCarStore((state) => state.fetchFavorites);
  const deleteCar = useCarStore((state) => state.deleteCar);
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      await fetchFavorites();
      const favorites = useCarStore.getState().favorites;
      setFavorites(favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (carId: string) => {
    await deleteCar(carId);
    setFavorites(favorites.filter((fav) => fav.id !== carId));
  };

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
          My Favorites
        </h1>

        {loading ? (
          <p className={`mt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Loading...
          </p>
        ) : favorites.length === 0 ? (
          <p className={`mt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            You have no favorites yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {favorites.map((favorite) => (
              <div key={favorite.id}>
                <FavoritesItem
                  car={favorite}
                  isDark={isDark}
                  onRemove={handleRemoveFavorite}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
