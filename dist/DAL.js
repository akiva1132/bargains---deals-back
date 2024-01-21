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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCar = exports.getCarsFromDB = void 0;
const mongoSchema_1 = require("./configuration/mongoSchema");
const getCarsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getCarsFromDB = getCarsFromDB;
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
