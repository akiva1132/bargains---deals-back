"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_1 = require("./configuration/mongo");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('auction/priceIncrease', authenticateToken, priceIncrease);
app.post('auction/cars', getAllCars);
app.post('auction/getCar', getCar);
app.post('auction/addCar', authenticateToken, deleteCar);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// app.get('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongo_1.connectToMongo)();
    console.log(`server is running on ${PORT}`);
}));
