"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskModelSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    date: {
        type: Date,
        required: true,
        default: new Date().toISOString().split('T')[0]
    },
    startTime: {
        type: String,
        required: true,
        default: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    },
    endTime: {
        type: String,
        required: true,
        default: new Date(new Date().getTime() + 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
});
const taskModel = (0, mongoose_1.model)('Task', taskModelSchema);
exports.default = taskModel;
//# sourceMappingURL=task.js.map