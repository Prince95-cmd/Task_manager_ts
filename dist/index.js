"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const passport_1 = __importDefault(require("passport"));
const task_1 = __importDefault(require("./routes/task"));
const auth_1 = __importDefault(require("./routes/auth"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./authentication/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
(0, db_1.default)();
let PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use('/', auth_1.default);
app.use('/tasks', passport_1.default.authenticate('jwt', { session: false }), task_1.default);
app.get('/', (_req, res) => {
    res.send('Task manager api in typescript');
    console.log('Task manager api in typescript');
});
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
        error: err.message || 'Internal Server Error'
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map