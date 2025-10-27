"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const user_1 = __importDefault(require("../model/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
passport_1.default.use(new passport_jwt_1.Strategy({
    secretOrKey: process.env.JWT_SECRET_KEY,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()
}, async function (token, done) {
    try {
        const user = await user_1.default.findById(token.id);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        return done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));
passport_1.default.use('signup', new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (email, password, done) {
    try {
        const user = await user_1.default.create({ email, password });
        if (!user) {
            return done(null, false, { message: 'User registration failed' });
        }
        return done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));
passport_1.default.use('login', new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (email, password, done) {
    try {
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        const validate = await user.comparePassword(password);
        if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
        }
        return done(null, user, { message: 'Logged in Successfully' });
    }
    catch (error) {
        return done(error, false);
    }
}));
//# sourceMappingURL=auth.js.map