"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsAuctionModel = exports.UserAuctionModel = exports.UserModel = exports.CardModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const CarSchema = new mongoose_1.Schema({
    manufacturer: { type: String, required: true },
    name: { type: String, required: true },
    model: { type: Number, required: true },
    km: { type: Number, required: false },
    imageUrls: [{ type: String, required: true }],
    hand: { type: Number, required: false },
    test: { type: String, required: false },
    note: { type: String, required: false },
    price: { type: Number, required: false },
    advertiser: { type: String, required: false }
});
const UserSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    IsAdamin: { type: Boolean, required: true },
    profileImage: { type: String, required: true },
});
exports.CardModel = mongoose_1.default.model("Car", CarSchema);
exports.UserModel = mongoose_1.default.model("users", UserSchema);
exports.UserAuctionModel = mongoose_1.default.model("users-auction", UserSchema);
exports.CarsAuctionModel = mongoose_1.default.model("cars-auction", CarSchema);
