import FormField from "./FormField"
import fields from "../data/fields.ts"

export default function FormMain() {
  return (
     <>
      <div className="grid place-items-center h-screen bg-blue-600/60">
        {/* contenedor principal: campos a la izquierda, botón a la derecha */}
        <div className="flex items-start gap-6">
          <div className="flex flex-col gap-1">
            {fields.map((field) => (
              <FormField key={field.id} field={field} />
            ))}
          </div>

          <div className="flex items-start">
            <button
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-400 border-2 rounded hover:bg-blue-500 ml-4 self-start"
            >
              Search Car
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
