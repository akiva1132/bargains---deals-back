import { Request, Response } from "express";
import { getAllCarsFromDB, insertCar, getCarFromDB } from "./DAL";


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
    const {id} = req.params
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


