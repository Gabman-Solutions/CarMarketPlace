import type { Field } from "../types/index.ts";

type FielProps = {
  field: Field;
  isDark?: boolean;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options?: string[];
  isLoading?: boolean;
};
export default function FormField({
  field,
  isDark = false,
  value,
  onChange,
  options = [],
  isLoading = false,
}: FielProps) {
  // Stateless input: value and onChange come from parent (FormMain)
  const inputId = `field-${field.id}`;

  return (
    <div>
      <label
        className={`text-sm font-medium ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
        htmlFor={inputId}
      >
        {field.label}
      </label>
      {field.type === "input" ? (
        <input
          id={inputId}
          name={inputId}
          className={`w-full border rounded-md px-3 py-2 transition ${
            isDark
              ? "border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
              : "border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
          }`}
          type={field.type}
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <select
          id={inputId}
          name={inputId}
          className={`w-full border rounded-md px-3 py-2 transition ${
            isDark
              ? "border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
              : "border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
          }`}
          value={value}
          onChange={onChange}
          disabled={isLoading}
        >
          <option value="">
            {isLoading ? "Cargando..." : "Selecciona una opción"}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
