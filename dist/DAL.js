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
exports.getToken = exports.insertCar = exports.getCarFromDB = exports.getAllCarsFromDB = exports.secretKey = void 0;
const mongoSchema_1 = require("./configuration/mongoSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secretKey = "akiva1132";
const getAllCarsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield mongoSchema_1.CardModel.find();
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
        console.log(error);
    }
});
exports.getAllCarsFromDB = getAllCarsFromDB;
const getCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield mongoSchema_1.CardModel.findById(id);
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
        console.log(error);
    }
});
exports.getCarFromDB = getCarFromDB;
const insertCar = (car) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCar = new mongoSchema_1.CardModel(car);
        return yield newCar.save();
    }
    catch (error) {
        throw error;
        console.log(error);
    }
});
exports.insertCar = insertCar;
const getToken = (userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield mongoSchema_1.UserModel.findOne({ userName: userName });
        if (result && result.password === password) {
            console.log(result);
            const token = jsonwebtoken_1.default.sign({ userName, password }, exports.secretKey, { expiresIn: '1m' });
            return token;
        }
        else
            throw new Error("user not found or password incorrect");
    }
    catch (error) {
        throw error;
        console.log(error);
    }
});
exports.getToken = getToken;
