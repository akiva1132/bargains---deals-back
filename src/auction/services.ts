import { NextFunction, Request, Response } from "express";
import {
    getAllCarsFromDB,
    insertCar,
    getCarFromDB,
    secretKey,
    changePriceDB,
    getToken,
    addUser,
    getAllUsersFromDB
} from "./DAL";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL;


export const getAllCars = async (req: Request, res: Response) => {
    try {
        const advertiser = req.params.advertiser
        if (!advertiser) throw new Error("advertiser requyer")
        console.log(advertiser);
        const cars = await getAllCarsFromDB(advertiser)
        res.send(cars)
    }
    catch (error) {
        if (error instanceof Error) res.status(400).send(error.message)
    }
}


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersFromDB()
        const newUsers = users.map((user) => {
            return {
                id: user._id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                IsAdamin: user.IsAdamin,
                profileImage: user.profileImage
            }
        })
        console.log(newUsers);
        
        res.send(newUsers)
    }
    catch (error) {
        if (error instanceof Error) res.status(400).send(error.message)
    }
}


export const getCar = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const cars = await getCarFromDB(id)
        res.send(cars)
    }
    catch (error) {
        if (error instanceof Error) res.status(400).send(error.message)
    }
}

export const addCar = async (req: Request, res: Response) => {
    try {
        const car = req.body
        await insertCar(car)
        res.send("the transaction completed successfully!")
    }
    catch (error) {
        if (error instanceof Error) res.status(400).send(error.message)
    }
}


export const checkPrice = async (req: Request, res: Response) => {
    // All processes for this document should be stopped until the update is complete
    const { id } = req.body
    try {
        if (!id) {
            throw new Error("Id is requer")
        }
        const cars = await getCarFromDB(id)
        return cars?.price
    }
    catch (error) {
        if (error instanceof Error) res.status(400).send(error.message)
    }
}


export const priceIncrease = async (req: Request, res: Response) => {
    const { adId, price } = req.body
    try {
        if (+ price < 500) {
            throw new Error('סכום מינמלי להעלאה הוא 500 ש"ח')
        }
        await changePriceDB(adId, + price)
        res.status(200).send("הסכום החדש נקלט במערכת")
    }
    catch (error) {
        if (error instanceof Error) res.status(400).send(error.message)
    }
}



export const logIn = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body
        console.log(userName, password, "gfhgf");
        const token = await getToken(userName, password)
        res.send(token)
    }
    catch (error) {
        if (error instanceof Error) res.status(400).send(error.message)
    }
}

export const regiset = async (req: Request, res: Response) => {
    try {
        const user = req.body
        const token = await addUser(user)
        res.send(token)
    }
    catch (error) {
        if (error instanceof Error) res.status(400).send(error.message)
    }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded) next();
    } catch (error) {
        console.log(token);
        return res.status(403).json({ error: 'Forbidden' });
    }
}

// export const deleteCar = async (req: Request, res: Response) => {
//     const { id } = req.params
//     try {
//         await deleteCarFromDB(id)
//         res.send("deleted sucsses")
//     }
//     catch (error) {
//         if (error instanceof Error) res.status(400).send(error.message)
//     }
// }

// export const priceIncrease = async (req: Request, res: Response) => {
//     const { adId, price } = req.params
//     try {
//         await changePriceDB(adId, + price)
//         res.status(200).send("deleted sucsses")
//     }
//     catch (error) {
//         if (error instanceof Error) res.status(400).send(error.message)
//     }
// }



// export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
//     console.log('File uploaded:', req.body);
//     res.send(`${BASE_URL}uploads/${req.body}`);
// }
