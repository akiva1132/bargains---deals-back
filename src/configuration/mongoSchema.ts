import mongoose, { Schema, InferSchemaType, Model } from "mongoose";

const CarSchema = new Schema(
  {
    manufacturer: { type: String, required: true },
    name: { type: String, required: true },
    model: { type: Number, required: true },
    km: { type: Number, required: true },
    imageUrls: [{ type: String, required: true }],
    note: { type: String, required: true }
  }
);


export type Car = InferSchemaType<typeof CarSchema>;

export const CardModel: Model<Car> = mongoose.model<Car>(
  "Car",
  CarSchema
);
