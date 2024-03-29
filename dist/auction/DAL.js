"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.AddCodeInDB = exports.deleteCarFromDB = exports.getNameGetByID = exports.incrementUserField = exports.getToken = exports.changePriceDB = exports.insertCar = exports.getCarFromDB = exports.getAllUsersFromDB = exports.getAllCarsFromDB = exports.secretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoSchema_1 = require("../configuration/mongoSchema");
const fs_1 = __importDefault(require("fs"));
exports.secretKey = "akiva1132";
const getAllCarsFromDB = async (advertiser) => {
    try {
        const result = await mongoSchema_1.CarsAuctionModel.find({ advertiser: advertiser });
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
        console.log(error);
    }
};
exports.getAllCarsFromDB = getAllCarsFromDB;
const getAllUsersFromDB = async () => {
    try {
        const result = await mongoSchema_1.UserAuctionModel.find();
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
        console.log(error);
    }
};
exports.getAllUsersFromDB = getAllUsersFromDB;
const getCarFromDB = async (id) => {
    try {
        const result = await mongoSchema_1.CarsAuctionModel.findById(id);
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
        const newCar = new mongoSchema_1.CarsAuctionModel(car);
        return await newCar.save();
    }
    catch (error) {
        throw error;
        console.log(error);
    }
};
exports.insertCar = insertCar;
const changePriceDB = async (id, price) => {
    try {
        if (!id || !price) {
            throw new Error("id or price not accepted ");
        }
        const result = await mongoSchema_1.CarsAuctionModel.findOneAndUpdate({ _id: id }, { $inc: { price: price } }, { new: true });
        if (!result)
            throw new Error("car is not exist");
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.changePriceDB = changePriceDB;
const getToken = async (userName, password) => {
    try {
        const result = await mongoSchema_1.UserAuctionModel.findOne({ userName: userName });
        if (result && result.password === password) {
            console.log(result);
            console.log(result);
            const userId = result._id.toString();
            const isAdmin = result.IsAdamin;
            const token = jsonwebtoken_1.default.sign({ userName, password, userId, isAdmin }, exports.secretKey, { expiresIn: '30d' });
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
const incrementUserField = async (id) => {
    try {
        const updatedUser = await mongoSchema_1.UserAuctionModel.updateOne({ _id: id }, { $inc: { numberAds: 1 } });
        return updatedUser;
    }
    catch (error) {
        console.error('Error incrementing user field:', error);
        throw error;
    }
};
exports.incrementUserField = incrementUserField;
const getNameGetByID = async (id) => {
    try {
        console.log(id);
        const user = await mongoSchema_1.UserAuctionModel.findById(id).select('fullName');
        console.log(user);
        return user === null || user === void 0 ? void 0 : user.fullName;
    }
    catch (error) {
        console.error('Error incrementing user field:', error);
        throw error;
    }
};
exports.getNameGetByID = getNameGetByID;
const deleteCarFromDB = async (id, userId) => {
    try {
        console.log(id);
        const result = await mongoSchema_1.CarsAuctionModel.deleteOne({ _id: id });
        await mongoSchema_1.UserAuctionModel.updateOne({ _id: userId }, { $inc: { numberAds: -1 } });
        console.log(result);
        if (result.deletedCount) {
            return "המודעה נמחקה בהצלחה";
        }
        else {
            throw new Error("error");
        }
    }
    catch (error) {
        console.error('Error incrementing user field:', error);
        throw error;
    }
};
exports.deleteCarFromDB = deleteCarFromDB;
const AddCodeInDB = async (isAdmin) => {
    try {
        if (!isAdmin) {
            throw new Error("הרשאת ניהול נדרשת");
        }
        const code = Math.floor(Math.random() * 1000000);
        fs_1.default.writeFile('./data.json', JSON.stringify(code), (err) => {
            if (err) {
                throw new Error('אירעה שגיאה ביצירת הקוד:' + err.message);
                return;
            }
            console.log(code);
        });
        return code.toString();
    }
    catch (error) {
        console.error('Error incrementing user field:', error);
        throw error;
    }
};
exports.AddCodeInDB = AddCodeInDB;
const addUser = async (user, code) => {
    try {
        const isExsist = await mongoSchema_1.UserAuctionModel.findOne({ userName: user.userName });
        if (isExsist) {
            throw new Error("המשתמש כבר קיים");
        }
        const codeFromFile = fs_1.default.readFileSync('./data.json');
        console.log(codeFromFile.toString(), code.toString());
        if (codeFromFile.toString() !== code.toString()) {
            throw new Error("קוד הרשמה אינו תואם");
        }
        fs_1.default.writeFileSync('./data.json', "0584241132");
        user.IsAdamin = false;
        if (!user.profileImage)
            user.profileImage = "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=";
        const newUser = new mongoSchema_1.UserAuctionModel(user);
        const result = await newUser.save();
        const { userName, password } = user;
        const userId = result._id.toString();
        const token = jsonwebtoken_1.default.sign({ userName, password, userId }, exports.secretKey, { expiresIn: '30d' });
        return token;
    }
    catch (error) {
        throw error;
        console.log(error);
    }
};
exports.addUser = addUser;
