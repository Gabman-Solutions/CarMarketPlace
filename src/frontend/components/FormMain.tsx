import { useEffect, useState } from "react";
import FormField from "./FormField";
import fields from "../data/fields.ts";

type FormValues = {
  [key: string]: string;
};

export default function FormMain() {
  const [isDark, setIsDark] = useState(false);
  const [values, setValues] = useState<FormValues>({});

  useEffect(() => {
    // inicializar valores de los campos con claves basadas en id
    const initial: FormValues = {};
    fields.forEach((f) => (initial[`field-${f.id}`] = ""));
    setValues(initial);
  }, []);

  function handleChange(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    setValues((prev) => ({ ...prev, [id]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // enviar datos: por ahora los mostramos en consola
    console.log("Form submit", values);
    // aquí puedes llamar a una API o prop
    alert("Submitted: " + JSON.stringify(values));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900/10 p-6">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-3xl rounded-xl shadow-lg overflow-hidden transition-colors ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className={`text-2xl font-semibold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Find your next car
              </h2>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Fill up the form to search cars based on your criteria.
              </p>
            </div>

            {/* Toggle day/night */}
            <button
              type="button"
              aria-label="Toggle day/night"
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full border transition ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-yellow-300"
                  : "bg-white border-gray-200 text-gray-700"
              }`}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {fields.map((field) => {
              const id = `field-${field.id}`;
              return (
                <FormField
                  key={field.id}
                  field={field}
                  isDark={isDark}
                  value={values[id] ?? ""}
                  onChange={(e) => handleChange(id, e)}
                />
              );
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className={`px-5 py-3 rounded-md font-semibold shadow transition ${
                isDark
                  ? "bg-blue-800 text-white hover:bg-blue-900"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isDark ? "Search Car" : "Search Car"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
