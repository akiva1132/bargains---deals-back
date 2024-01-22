import express from "express"
import dotenv from "dotenv";
import { connectToMongo } from "./configuration/mongo";
import cors from 'cors';
import { addCar, authenticateToken, getAllCars, getCar, logIn } from "./services";

dotenv.config();
const PORT = process.env.PORT || 3000


const app = express()
app.use(express.json());
app.use(cors())


app.get('/cars', getAllCars)
app.get('/getCar/:id', getCar)
app.post('/addCar',authenticateToken,  addCar)
app.post('/logIn', logIn)

app.listen(PORT, async ()=> {
await connectToMongo()
console.log(`server is running on ${PORT}`)

})