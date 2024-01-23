import { NextFunction, Request, Response } from "express";
import { getAllCarsFromDB, insertCar, getCarFromDB, getToken, secretKey, deleteCarFromDB } from "./DAL";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL;


export const getAllCars = async (req: Request, res: Response) => {
    try {
        const cars = await getAllCarsFromDB()
        res.send(cars)
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

export const logIn = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body
        console.log(userName, password);
        const token = await getToken(userName, password)
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

export const deleteCar = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await deleteCarFromDB(id)
        res.send("deleted sucsses")
    }
    catch (error) {
        if (error instanceof Error) res.status(400).send(error.message)
    }
}


export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    console.log('File uploaded:', req.body);
    res.send(`${BASE_URL}uploads/${req.body}`);
}
