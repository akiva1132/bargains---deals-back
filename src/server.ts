import express from "express"
import dotenv from "dotenv";
import { connectToMongo } from "./configuration/mongo";
import cors from 'cors';


import path from 'path';
import { Request, Response } from "express";
import { upload } from "./handleFiles";
import { carSalesRouter } from "./carSales/router";
import { auctionRouter } from "./auction/router";



dotenv.config();
const PORT = process.env.PORT || 3000


const app = express()
app.use(express.json());
app.use(cors())

app.use('/', carSalesRouter)
app.use('/auction', auctionRouter)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));




// app.get('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(PORT, async () => {
    await connectToMongo()
    console.log(`server is running on ${PORT}`)

})