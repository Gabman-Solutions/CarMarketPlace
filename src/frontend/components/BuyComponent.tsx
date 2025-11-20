import { useEffect, useState } from "react";
import FormField from "./FormField";
import fields from "../data/fields.ts";
import { fetchCarMakers, fetchCarModels } from "../services/carApi.ts";

type FormValues = {
  [key: string]: string;
};
interface BuyComponentProps {
  isDark: boolean;
}

export default function BuyComponent({ isDark }: BuyComponentProps) {
  const [values, setValues] = useState<FormValues>({});
  const [makers, setMakers] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [loadingMakers, setLoadingMakers] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);

  useEffect(() => {
    const initial: FormValues = {};
    fields.forEach((f) => (initial[`field-${f.id}`] = ""));
    setValues(initial);
  }, []);

  // Fetch makers on mount
  useEffect(() => {
    const fetchMakersAsync = async () => {
      setLoadingMakers(true);
      try {
        const data = await fetchCarMakers();
        setMakers(data);
      } catch (error) {
        console.error("Error fetching makers:", error);
        setMakers([]);
      } finally {
        setLoadingMakers(false);
      }
    };
    fetchMakersAsync();
  }, []);

  // Fetch models when Car Brand (field-1) changes
  useEffect(() => {
    const carBrand = values["field-1"];
    if (carBrand) {
      const fetchModelsAsync = async () => {
        setLoadingModels(true);
        try {
          const data = await fetchCarModels(carBrand);
          setModels(data);
        } catch (error) {
          console.error("Error fetching models:", error);
          setModels([]);
        } finally {
          setLoadingModels(false);
        }
      };
      fetchModelsAsync();
    } else {
      setModels([]);
    }
  }, [values]);

  function handleChange(
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setValues((prev) => ({ ...prev, [id]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Submitted: " + JSON.stringify(values));
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
        <form
          onSubmit={handleSubmit}
          className={`w-full rounded-xl overflow-hidden transition-colors ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <div className="p-6 md:p-8">
            <div className=" mb-4">
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
            </div>
            <div className="flex flex-col gap-3">
              {fields.map((field) => {
                const id = `field-${field.id}`;
                // Pass options to select fields
                let options: string[] = [];
                if (field.label === "Car Brand") {
                  options = makers;
                } else if (field.label === "Car Model") {
                  options = models;
                }
                return (
                  <FormField
                    key={field.id}
                    field={field}
                    isDark={isDark}
                    value={values[id] ?? ""}
                    onChange={(e) => handleChange(id, e)}
                    options={options}
                    isLoading={
                      field.label === "Car Brand"
                        ? loadingMakers
                        : field.label === "Car Model"
                        ? loadingModels
                        : false
                    }
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
                 Search Car
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
