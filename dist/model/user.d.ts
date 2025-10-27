import { Document } from "mongoose";
interface IUser {
    email: string;
    password: string;
}
interface IUserDocument extends IUser, Document {
    comparePassword(password: string): Promise<boolean>;
}
declare const userModel: import("mongoose").Model<IUserDocument, {}, {}, {}, Document<unknown, {}, IUserDocument, {}, {}> & IUserDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default userModel;
//# sourceMappingURL=user.d.ts.map