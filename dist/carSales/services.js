"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.deleteCar = exports.authenticateToken = exports.logIn = exports.addCar = exports.getCar = exports.getAllCars = void 0;
const DAL_1 = require("./DAL");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_URL = process.env.BASE_URL;
const getAllCars = async (req, res) => {
    try {
        const cars = await (0, DAL_1.getAllCarsFromDB)();
        res.send(cars);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
};
exports.getAllCars = getAllCars;
const getCar = async (req, res) => {
    const { id } = req.params;
    try {
        const cars = await (0, DAL_1.getCarFromDB)(id);
        res.send(cars);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
};
exports.getCar = getCar;
const addCar = async (req, res) => {
    try {
        const car = req.body;
        await (0, DAL_1.insertCar)(car);
        res.send("the transaction completed successfully!");
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
};
exports.addCar = addCar;
const logIn = async (req, res) => {
    try {
        const { userName, password } = req.body;
        console.log(userName, password);
        const token = await (0, DAL_1.getToken)(userName, password);
        res.send(token);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
};
exports.logIn = logIn;
const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token)
        return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, DAL_1.secretKey);
        if (decoded)
            next();
    }
    catch (error) {
        console.log(token);
        return res.status(403).json({ error: 'Forbidden' });
    }
};
exports.authenticateToken = authenticateToken;
const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        await (0, DAL_1.deleteCarFromDB)(id);
        res.send("deleted sucsses");
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
};
exports.deleteCar = deleteCar;
const uploadFile = async (req, res, next) => {
    console.log('File uploaded:', req.body);
    res.send(`${BASE_URL}uploads/${req.body}`);
};
exports.uploadFile = uploadFile;
