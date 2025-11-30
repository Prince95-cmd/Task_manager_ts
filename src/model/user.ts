import { Schema, model, Document} from "mongoose";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);



interface IUser {
    email: string;
    password: string;
}

interface IUserDocument extends IUser, Document {
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{ 
        type: String,
        required: true,
    }
});

//  Hash the password before saving the user model
async function hashPassword(this: IUserDocument): Promise<void>{
    const user = this;
    // Check if the password is modified
    if(!user.isModified('password')){
        return;
    }
    // Hash the password with a salt round of 10
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
}

// Pass hashed password to pre 'save' hook
userSchema.pre<IUserDocument>('save', hashPassword);

// Method to compare password for login
userSchema.methods.comparePassword = async function(password: string): Promise<boolean>{
    const user = this as IUserDocument;
    const compare = bcrypt.compare(password, user.password);
    return compare;
}

const userModel = model<IUserDocument>('User', userSchema);

export default userModel;