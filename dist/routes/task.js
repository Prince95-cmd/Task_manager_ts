"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_1 = __importDefault(require("../model/task"));
const taskRouter = express_1.default.Router();
taskRouter.get('/', async (_req, res) => {
    try {
        const allTasks = await task_1.default.find();
        res.status(200).send({
            message: "All tasks fetched successfully",
            data: allTasks
        });
    }
    catch (err) {
        if (err.status) {
            const appError = err;
            res.status(appError.status || 500).json({
                message: appError.message || 'Something went wrong'
            });
        }
        else if (err instanceof Error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            });
        }
        else {
            res.status(500).json({
                message: 'An unknown error occurred'
            });
        }
    }
});
exports.default = taskRouter;
//# sourceMappingURL=task.js.map