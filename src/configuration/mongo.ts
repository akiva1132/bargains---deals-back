import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_DB_URI;

export const connectToMongo = async () => {
    try {
        if (typeof uri !== "string") throw new Error("invalid mongo uri");

        await mongoose.connect(uri, { dbName: "Bargains-and-deals" });
        console.log("connected to Bargains-and-deals DB");
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

