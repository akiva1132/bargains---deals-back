"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.logIn = exports.addCar = exports.getCar = exports.getAllCars = void 0;
const DAL_1 = require("./DAL");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield (0, DAL_1.getAllCarsFromDB)();
        res.send(cars);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
});
exports.getAllCars = getAllCars;
const getCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cars = yield (0, DAL_1.getCarFromDB)(id);
        res.send(cars);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
});
exports.getCar = getCar;
const addCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = req.body;
        yield (0, DAL_1.insertCar)(car);
        res.send("the transaction completed successfully!");
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
});
exports.addCar = addCar;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        console.log(userName, password);
        const token = yield (0, DAL_1.getToken)(userName, password);
        res.send(token);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
});
exports.logIn = logIn;
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('Authorization');
    if (!token)
        return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, DAL_1.secretKey);
        if (decoded)
            next();
    }
    catch (error) {
        return res.status(403).json({ error: 'Forbidden' });
    }
});
exports.authenticateToken = authenticateToken;
