"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGO_DB_URI;
const connectToMongo = async () => {
    try {
        if (typeof uri !== "string")
            throw new Error("invalid mongo uri");
        await mongoose_1.default.connect(uri, { dbName: "Bargains-and-deals" });
        console.log("connected to Bargains-and-deals DB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
exports.connectToMongo = connectToMongo;
