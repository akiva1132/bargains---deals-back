"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_1 = require("./configuration/mongo");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const router_1 = require("./carSales/router");
const router_2 = require("./auction/router");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/', router_1.carSalesRouter);
app.use('/auction', router_2.auctionRouter);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// app.get('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(PORT, async () => {
    await (0, mongo_1.connectToMongo)();
    console.log(`server is running on ${PORT}`);
});
