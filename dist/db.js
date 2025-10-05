"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoURL = process.env.MONGODB_CONNECTION_URL;
if (!mongoURL) {
    throw new Error("MONGODB_CONNECTION_URL is not defined in environment variables");
}
const connectToMongoDB = async () => {
    try {
        await mongoose_1.default.connect(mongoURL);
        console.log("Connected to MongoDB successfully");
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('MongoDB connection lost. Attempting to reconnect...');
        });
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};
exports.default = connectToMongoDB;
//# sourceMappingURL=db.js.map