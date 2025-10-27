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
        res.status(200).json({
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
taskRouter.post('/', async (req, res) => {
    const taskData = req.body;
    console.log(taskData);
    try {
        const newTask = await task_1.default.create(taskData);
        console.log(newTask);
        res.status(201).json({
            message: "Task created successfully",
            data: newTask
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
taskRouter.get('/:id', async (req, res) => {
    const taskId = req.params.id;
    console.log("Task id:", taskId);
    try {
        const task = await task_1.default.findById(taskId);
        if (!task) {
            res.status(404).json({
                message: "Task not found"
            });
            return;
        }
        res.status(200).json({
            message: "Task fetched successfully",
            data: task
        });
        console.log(task);
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
taskRouter.put('/:id', async (req, res) => {
    const taskId = req.params.id;
    console.log("Task id:", taskId);
    const updatedTaskData = req.body;
    console.log("Updated task data:", updatedTaskData);
    try {
        const updatedTask = await task_1.default.findByIdAndUpdate(taskId, updatedTaskData, { new: true });
        if (!updatedTask) {
            res.status(404).json({
                message: "Task not found"
            });
            return;
        }
        res.status(200).json({
            message: "Task updated successfully",
            data: updatedTask
        });
        console.log(updatedTask);
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
taskRouter.delete('/:id', async (req, res) => {
    const taskId = req.params.id;
    console.log(taskId);
    try {
        const deleteTask = await task_1.default.findByIdAndDelete(taskId);
        if (!deleteTask) {
            res.status(404).json({
                message: "Task not found"
            });
            return;
        }
        res.status(200).json({
            message: "Task deleted successfully",
            data: deleteTask
        });
        console.log(deleteTask);
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
    }
});
exports.default = taskRouter;
//# sourceMappingURL=task.js.map