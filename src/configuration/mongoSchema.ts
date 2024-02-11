import mongoose, { Schema, InferSchemaType, Model } from "mongoose";



const CarSchema = new Schema(
  {
    manufacturer: { type: String, required: true },
    name: { type: String, required: true },
    model: { type: Number, required: true },
    km: { type: Number, required: false },
    imageUrls: [{ type: String, required: true }],
    hand: { type: Number, required: false },
    test: { type: String, required: false },
    note: { type: String, required: false },
    price: { type: Number, required: false },
    advertiser: { type: String, required: true }
  }
);

const UserSchema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    IsAdamin: { type: Boolean, required: true },
    profileImage: { type: String, required: true },
    numberAds: { type: Number, required: true },
  }
);


export type Car = InferSchemaType<typeof CarSchema>;

export type User = InferSchemaType<typeof UserSchema>;

export const CardModel: Model<Car> = mongoose.model<Car>(
  "Car",
  CarSchema,
);

export const UserModel: Model<User> = mongoose.model<User>(
  "users",
  UserSchema,
);





export const UserAuctionModel: Model<User> = mongoose.model<User>(
  "users-auction",
  UserSchema,
);

export const CarsAuctionModel: Model<Car> = mongoose.model<Car>(
  "cars-auction",
  CarSchema
);