import express from "express"

import {
    addCar, authenticateToken,
    getAllCars,
    getCar,
    logIn,
    priceIncrease,
    regiset,
    getAllUsers,
    generateCode,
    getName,
    deleteCar
} from "./services";

export const auctionRouter = express.Router();


auctionRouter.put('/priceIncrease', authenticateToken, priceIncrease)
auctionRouter.get('/cars/:advertiser?', getAllCars)
auctionRouter.get('/users', getAllUsers)
auctionRouter.get('/getCar/:id', getCar)
auctionRouter.post('/addCar', authenticateToken, addCar)
auctionRouter.post('/generateCode', authenticateToken, generateCode)
auctionRouter.get('/getName/:id',authenticateToken, getName)
auctionRouter.post('/car/:carId/:userId',authenticateToken, deleteCar)


auctionRouter.post('/logIn', logIn)
auctionRouter.post('/register/:code', regiset)