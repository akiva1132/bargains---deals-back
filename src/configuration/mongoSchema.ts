import mongoose, { Schema, InferSchemaType, Model } from "mongoose";

const CarSchema = new Schema(
  {
    manufacturer: { type: String, required: true },
    name: { type: String, required: true },
    model: { type: Number, required: true },
    km: { type: Number, required: false },
    imageUrls: [{ type: String, required: true }],
    hand:  { type: Number, required: false },
    test: { type: String, required: false },
    note: { type: String, required: false },
    price: { type: String, required: false }
  }
);

const UserSchema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true }
  }
);


export type Car = InferSchemaType<typeof CarSchema>;

export type User = InferSchemaType<typeof UserSchema>;

export const CardModel: Model<Car> = mongoose.model<Car>(
  "Car",
  CarSchema
);

export const UserModel: Model<User> = mongoose.model<User>(
  "users",
  UserSchema
);

