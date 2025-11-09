
import type { Field } from "../types/index.ts"
type FielProps ={
    field:Field
}
export default function FormField({field}: FielProps) {
  return (
    <div className="flex flex-col gap-1 w-full max-w-md">
      <label className="font-bold" htmlFor={field.label}>
        {field.label}
      </label>
      <input
        className="block min-w-0 grow bg-gray-800 py-1.5 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm"
        type={field.type}
        placeholder={field.placeholder}
      />
    </div>
  )
}
