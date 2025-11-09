
import type { Field } from "../types/index.ts"
type FielProps ={
    field:Field
}
export default function FormField({field}: FielProps) {
  return (
    <div className="mt-2 w-full"> 
        <label className="font-bold" htmlFor={field.label}>{field.label}</label>
        <input className= "block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" type={field.type} placeholder={field.placeholder}>
        </input>
    </div>
  )
}
