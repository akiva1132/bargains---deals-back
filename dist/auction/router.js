"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auctionRouter = void 0;
const express_1 = __importDefault(require("express"));
const services_1 = require("./services");
exports.auctionRouter = express_1.default.Router();
exports.auctionRouter.put('/priceIncrease', services_1.authenticateToken, services_1.priceIncrease);
exports.auctionRouter.get('/cars/:advertiser?', services_1.getAllCars);
exports.auctionRouter.get('/users', services_1.getAllUsers);
exports.auctionRouter.get('/getCar/:id', services_1.getCar);
exports.auctionRouter.post('/addCar', services_1.authenticateToken, services_1.addCar);
exports.auctionRouter.post('/generateCode', services_1.authenticateToken, services_1.generateCode);
exports.auctionRouter.get('/getName/:id', services_1.authenticateToken, services_1.getName);
exports.auctionRouter.post('/car/:carId/:userId', services_1.authenticateToken, services_1.deleteCar);
exports.auctionRouter.post('/logIn', services_1.logIn);
exports.auctionRouter.post('/register/:code', services_1.regiset);
