import { Car, CardModel } from "./configuration/mongoSchema"


export const getAllCarsFromDB = async () => {
    try {
        const result = await CardModel.find()
        console.log(result);
        return result
    }
    catch (error) {
        throw error
        console.log(error)
    }
}

export const getCarFromDB = async (id:string) => {
    try {
        const result = await CardModel.findById(id)
        console.log(result);
        return result
    }
    catch (error) {
        throw error
        console.log(error)
    }
}


export const insertCar = async (car: Car) => {
    try {
        const newCar = new CardModel(car);
        return await newCar.save()
    }
    catch (error) {
        throw error
        console.log(error)
    }
}