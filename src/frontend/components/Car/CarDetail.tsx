import type { Car } from "../../types/index.ts";

export default function CarDetail(Car: Car) {
  return (
    <div>
        <div className="p-4 border rounded-md shadow-md bg-white">
            <h2>{Car.brand} {Car.model}</h2>
            <img src={Car.image}></img>
            <p>Year: {Car.year}</p>
            <p>Price: ${Car.price}</p>
            <p>Mileage: {Car.mileage} miles</p>
            <p>Description: {Car.description}</p> 
        </div>
    </div>
  )
}
