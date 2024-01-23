import express from "express"
import dotenv from "dotenv";
import { connectToMongo } from "./configuration/mongo";
import cors from 'cors';
import { addCar, authenticateToken, deleteCar, getAllCars, getCar, logIn, uploadFile } from "./services";
import path from 'path';
import { Request, Response } from "express";
import { upload } from "./handleFiles";


dotenv.config();
const PORT = process.env.PORT || 3000


const app = express()
app.use(express.json());
app.use(cors())


app.get('/cars', getAllCars)
app.get('/getCar/:id', getCar)
app.post('/addCar',authenticateToken,  addCar)
app.post('/logIn', logIn)
app.delete('/:id',authenticateToken, deleteCar)
app.post('/upload', upload.single('file'), uploadFile);


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));




// app.get('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(PORT, async ()=> {
await connectToMongo()
console.log(`server is running on ${PORT}`)

})