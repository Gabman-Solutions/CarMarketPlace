import FormField from "./FormField"
import fields from "../data/fields.ts"

export default function FormMain() {
  return (
     <>
      <div className="grid place-items-center h-screen p-4 gap-4 bg-blue-600/60 border-collapse">
        {
            fields.map((field) => ( 
                <FormField key={field.id} field={field}/>
            ))
        }
        <div className="flex items-right justify-right w-full">
            <button className="
                px-4 py-2 
                text-sm font-semibold 
                text-white bg-blue-400 
                rounded 
                hover:bg-blue-500">
                Search Car
            </button>
        </div>
      </div>
    </>
  )
}
