import express from "express"

import { addCar, authenticateToken, getAllCars, getCar, logIn, priceIncrease, regiset } from "./services";

export const auctionRouter = express.Router();


auctionRouter.put('/priceIncrease',authenticateToken, priceIncrease)
auctionRouter.get('/cars', getAllCars)
auctionRouter.get('/getCar/:id', getCar)
auctionRouter.post('/addCar', authenticateToken, addCar)

auctionRouter.post('/logIn', logIn)
auctionRouter.post('/regiset', regiset)