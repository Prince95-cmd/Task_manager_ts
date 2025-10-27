"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});
async function hashPassword() {
    const user = this;
    if (!user.isModified('password')) {
        return;
    }
    const hash = await bcrypt_1.default.hash(user.password, saltRounds);
    user.password = hash;
}
userSchema.pre('save', hashPassword);
userSchema.methods.comparePassword = async function (password) {
    const user = this;
    const compare = bcrypt_1.default.compare(password, user.password);
    return compare;
};
const userModel = (0, mongoose_1.model)('User', userSchema);
exports.default = userModel;
//# sourceMappingURL=user.js.map