import express, {Request, Response, NextFunction} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authRouter = express.Router();

// Interface for custom error handling
interface AppError extends Error {
    status?: number
} 


authRouter.post(
    '/signup', 
    passport.authenticate('signup', {session: false}), 
    async(req: Request, res: Response, _next: NextFunction): Promise<void> => {
        res.json({
            message: 'Signup successful',
            user: req.user
        })
    })

authRouter.post(
    '/login',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        passport.authenticate(
            'login', 
            async (err: AppError | null, user: Express.User | false, _info?: Record<string, unknown>) => {
                try{
                    if(err){
                        return next(err);
                    } 
                    if(!user){
                        const error = new Error("Username or password is incorrect");
                        return next(error);
                    }

                    req.login(user, {session: false}, (loginErr: AppError | null) => {
                        if(loginErr){
                            return next(loginErr);
                        }

                        // We don't want to store the sensitive information such as the
                        // user password in the token so we pick only the email and id
                        const body = {id: user.id, email: user.email};

                        // Sign the JWT token and populate the payload with the user email and id
                        const token = jwt.sign(body, process.env.JWT_SECRET_KEY as string, {expiresIn: '1d'});

                        // Send back the token to the user
                        return res.json({ token });
                    });
                } catch(loginErr){
                    return next(loginErr as AppError);
                }
        }) (req, res, next);
    }
)

export default authRouter;