import userModel from "../../model/user";

declare global {
    namespace Express {
        export interface Request {
            user?: IUserDocument;
            login(user: User, option: {session: false},  done: (err?: any) => void): void;
        }
    }
}

declare global {
    namespace Express {
        export interface User {
            id: string;
            email: string;
            role?: string;
        }
    }
}