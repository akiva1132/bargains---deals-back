import express from "express"
import dotenv from "dotenv";
import { connectToMongo } from "./configuration/mongo";
import cors from 'cors';
import { addCar, getAllCars } from "./services";

dotenv.config();
const PORT = process.env.PORT || 3000


const app = express()
app.use(express.json());
app.use(cors())


app.get('/cars', getAllCars)
app.post('/addCar', addCar)
app.get('/getCar', getAllCars)

app.listen(PORT, async ()=> {
await connectToMongo()
console.log(`server is running on ${PORT}`)

})