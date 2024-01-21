import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_DB_URI;
export const connectToMongo = async () => {
    try {
        if (typeof uri !== "string") throw new Error("invalid mongo uri");
        await connect(uri, { dbName: "Bargains-and-deals" });
        console.log("connected to mongo");
    } catch (error) {
        return Promise.reject(error);
    }
};