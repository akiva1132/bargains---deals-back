import jwt from 'jsonwebtoken';
import { Car, CarsAuctionModel, User, UserAuctionModel } from '../configuration/mongoSchema';
import { error } from 'console';

export const secretKey = "akiva1132"
export const getAllCarsFromDB = async () => {
    try {
        const result = await CarsAuctionModel.find()
        console.log(result);
        return result
    }
    catch (error) {
        throw error
        console.log(error)
    }
}

export const getCarFromDB = async (id: string) => {
    try {
        const result = await CarsAuctionModel.findById(id)
        console.log(result);
        return result
    }
    catch (error) {
        throw error
    }
}


export const insertCar = async (car: Car) => {
    try {
        const newCar = new CarsAuctionModel(car);
        return await newCar.save()
    }
    catch (error) {
        throw error
        console.log(error)
    }
}


export const changePriceDB = async (id: string, price: number) => {
    try {
        if (!id || !price){
            throw new Error ("id or price not accepted ")
        }
        const result = await CarsAuctionModel.findOneAndUpdate(
            { _id: id },
            { $inc: { price: price } },
            { new: true }
        );
        if (!result) throw new Error ("car is not exist")
        return result;
    } catch (error) {
        throw error;
    }
};


export const getToken = async (userName: string, password: string) => {
    try {
        const result = await UserAuctionModel.findOne({ userName: userName })
        if (result && result.password === password) {
            console.log(result);
            const token = jwt.sign({ userName, password }, secretKey, { expiresIn: '30d' });
            console.log(token);

            return token
        }
        else throw new Error("user not found or password incorrect")
    }
    catch (error) {
        throw error
        console.log(error)
    }
}

export const addUser = async (user:User) => {
    try {
        const newUser = new UserAuctionModel(user);
        await newUser.save()
        const { userName, password } = user
        const token = jwt.sign({ userName, password }, secretKey, { expiresIn: '30d' });
        return token;
    }
    catch (error) {
        throw error
        console.log(error)
    }
}
