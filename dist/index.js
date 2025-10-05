"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const task_1 = __importDefault(require("./routes/task"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)();
let PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use('/tasks', task_1.default);
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