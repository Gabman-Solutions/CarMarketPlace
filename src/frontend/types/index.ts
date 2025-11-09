
export type Car = {
    id: string
    brand: string
    model: string
    year: number
    price: number
}
export type Field = {
    id: number
    label: string
    type: string
    placeholder: string
}

export type DraftCar = Omit<Car,'id'>