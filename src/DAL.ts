import { Car, CardModel, UserModel } from "./configuration/mongoSchema"
import jwt from 'jsonwebtoken';

export const secretKey = "akiva1132"
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


export const getToken = async (userName: string, password:string) => {
    try {
        const result = await UserModel.findOne({userName: userName})
        if (result && result.password === password){
            console.log(result);
            const token = jwt.sign({ userName, password }, secretKey, { expiresIn: '30d' });
            console.log(token);
            
            return token
        }
        else throw new Error ("user not found or password incorrect")


    }
    catch (error) {
        throw error
        console.log(error)
    }
}
