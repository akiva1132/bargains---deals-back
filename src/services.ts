import { Request, Response } from "express";
import { getCarsFromDB, insertCar } from "./DAL";


export const getAllCars = async (req: Request, res: Response) => {
    try {
        const cars = await getCarsFromDB()
        res.send(cars)
    }
    catch (error) {
        if (error instanceof Error) res.status(400).send(error.message)
    }
}

export const getCar = async (req: Request, res: Response) => {
    res.send("12345")
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


