interface Task {
    title: string;
    description: string;
    duration: String;
    status: String;
    date?: Date;
    startTime?: Date;
    endTime?: Date;
}
declare const taskModel: import("mongoose").Model<Task, {}, {}, {}, import("mongoose").Document<unknown, {}, Task, {}, {}> & Task & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default taskModel;
//# sourceMappingURL=task.d.ts.map