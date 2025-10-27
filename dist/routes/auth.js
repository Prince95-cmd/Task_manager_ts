"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authRouter = express_1.default.Router();
authRouter.post('/signup', passport_1.default.authenticate('signup', { session: false }), async (req, res, _next) => {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
});
authRouter.post('/login', async (req, res, next) => {
    passport_1.default.authenticate('login', async (err, user, _info) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                const error = new Error("Username or password is incorrect");
                return next(error);
            }
            req.login(user, { session: false }, (loginErr) => {
                if (loginErr) {
                    return next(loginErr);
                }
                const body = { id: user.id, email: user.email };
                const token = jsonwebtoken_1.default.sign(body, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                return res.json({ token });
            });
        }
        catch (loginErr) {
            return next(loginErr);
        }
    })(req, res, next);
});
exports.default = authRouter;
//# sourceMappingURL=auth.js.map