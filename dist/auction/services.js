"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.regiset = exports.logIn = exports.priceIncrease = exports.checkPrice = exports.addCar = exports.getCar = exports.getAllUsers = exports.getAllCars = void 0;
const DAL_1 = require("./DAL");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_URL = process.env.BASE_URL;
const getAllCars = async (req, res) => {
    try {
        const advertiser = req.params.advertiser;
        if (!advertiser)
            throw new Error("advertiser requyer");
        console.log(advertiser);
        const cars = await (0, DAL_1.getAllCarsFromDB)(advertiser);
        res.send(cars);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
};
exports.getAllCars = getAllCars;
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, DAL_1.getAllUsersFromDB)();
        const newUsers = users.map((user) => {
            return {
                id: user._id,
                userName: user.userName,
                fullName: user.fullName,
                phone: user.phone,
                IsAdamin: user.IsAdamin,
                profileImage: user.profileImage,
                numberAds: user.numberAds
            };
        });
        console.log(newUsers);
        res.send(newUsers);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
};
exports.getAllUsers = getAllUsers;
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
        console.log(car.advertiser);
        await (0, DAL_1.incrementUserField)(car.advertiser);
        res.send("the transaction completed successfully!");
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
};
exports.addCar = addCar;
const checkPrice = async (req, res) => {
    // All processes for this document should be stopped until the update is complete
    const { id } = req.body;
    try {
        if (!id) {
            throw new Error("Id is requer");
        }
        const cars = await (0, DAL_1.getCarFromDB)(id);
        return cars === null || cars === void 0 ? void 0 : cars.price;
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
};
exports.checkPrice = checkPrice;
const priceIncrease = async (req, res) => {
    const { adId, price } = req.body;
    try {
        if (+price < 500) {
            throw new Error('סכום מינמלי להעלאה הוא 500 ש"ח');
        }
        await (0, DAL_1.changePriceDB)(adId, +price);
        res.status(200).send("הסכום החדש נקלט במערכת");
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
};
exports.priceIncrease = priceIncrease;
const logIn = async (req, res) => {
    try {
        const { userName, password } = req.body;
        console.log(userName, password, "gfhgf");
        const token = await (0, DAL_1.getToken)(userName, password);
        res.send(token);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
};
exports.logIn = logIn;
const regiset = async (req, res) => {
    try {
        const user = req.body;
        console.log(req.body);
        console.log(user);
        const token = await (0, DAL_1.addUser)(user);
        res.send(token);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
};
exports.regiset = regiset;
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
// export const deleteCar = async (req: Request, res: Response) => {
//     const { id } = req.params
//     try {
//         await deleteCarFromDB(id)
//         res.send("deleted sucsses")
//     }
//     catch (error) {
//         if (error instanceof Error) res.status(400).send(error.message)
//     }
// }
// export const priceIncrease = async (req: Request, res: Response) => {
//     const { adId, price } = req.params
//     try {
//         await changePriceDB(adId, + price)
//         res.status(200).send("deleted sucsses")
//     }
//     catch (error) {
//         if (error instanceof Error) res.status(400).send(error.message)
//     }
// }
// export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
//     console.log('File uploaded:', req.body);
//     res.send(`${BASE_URL}uploads/${req.body}`);
// }
