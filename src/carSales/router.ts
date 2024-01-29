import express from "express"
import {
    addCar, authenticateToken,
    deleteCar,
    getAllCars,
    getCar,
    logIn,
    uploadFile
} from "./services";
import { upload } from "../handleFiles";

export const carSalesRouter = express.Router();


carSalesRouter.get('/cars', getAllCars)
carSalesRouter.get('/getCar/:id', getCar)
carSalesRouter.post('/addCar', authenticateToken, addCar)
carSalesRouter.post('/logIn', logIn)
carSalesRouter.delete('/:id', authenticateToken, deleteCar)
carSalesRouter.post('/upload', upload.single('file'), uploadFile);