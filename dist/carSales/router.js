"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carSalesRouter = void 0;
const express_1 = __importDefault(require("express"));
const services_1 = require("./services");
const handleFiles_1 = require("../handleFiles");
exports.carSalesRouter = express_1.default.Router();
exports.carSalesRouter.get('/cars', services_1.getAllCars);
exports.carSalesRouter.get('/getCar/:id', services_1.getCar);
exports.carSalesRouter.post('/addCar', services_1.authenticateToken, services_1.addCar);
exports.carSalesRouter.post('/logIn', services_1.logIn);
exports.carSalesRouter.delete('/:id', services_1.authenticateToken, services_1.deleteCar);
exports.carSalesRouter.post('/upload', handleFiles_1.upload.single('file'), services_1.uploadFile);
