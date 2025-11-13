interface FavoritesProps {
  isDark: boolean;
}

export default function Favorites({ isDark }: FavoritesProps) {
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
        <p
          className={`text-lg transition-colors duration-300 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Your favorite cars saved for later viewing.
        </p>
        {/* Contenido del componente Favorites aquí */}
      </div>
    </div>
  );
}
