"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.deleteCarFromDB = exports.insertCar = exports.getCarFromDB = exports.getAllCarsFromDB = exports.secretKey = void 0;
const mongoSchema_1 = require("../configuration/mongoSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secretKey = "akiva1132";
const getAllCarsFromDB = async () => {
    try {
        const result = await mongoSchema_1.CardModel.find();
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
        console.log(error);
    }
};
exports.getAllCarsFromDB = getAllCarsFromDB;
const getCarFromDB = async (id) => {
    try {
        const result = await mongoSchema_1.CardModel.findById(id);
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.getCarFromDB = getCarFromDB;
const insertCar = async (car) => {
    try {
        const newCar = new mongoSchema_1.CardModel(car);
        return await newCar.save();
    }
    catch (error) {
        throw error;
        console.log(error);
    }
};
exports.insertCar = insertCar;
const deleteCarFromDB = async (id) => {
    try {
        const result = await mongoSchema_1.CardModel.deleteOne({ _id: id });
        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.deleteCarFromDB = deleteCarFromDB;
const getToken = async (userName, password) => {
    try {
        const result = await mongoSchema_1.UserModel.findOne({ userName: userName });
        if (result && result.password === password) {
            console.log(result);
            const token = jsonwebtoken_1.default.sign({ userName, password }, exports.secretKey, { expiresIn: '30d' });
            console.log(token);
            return token;
        }
        else
            throw new Error("user not found or password incorrect");
    }
    catch (error) {
        throw error;
        console.log(error);
    }
};
exports.getToken = getToken;
