import passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import  UserModel  from '../model/user'; 
import dotenv from 'dotenv';

dotenv.config();

interface payLoad {
    id: string;
    email: string;
    iat?: number;
    exp?: number;
}

type VerifiedCallback = (error: unknown, user?: any, info?: any) => void;


passport.use(
    new JWTStrategy(
        {
            secretOrKey: process.env.JWT_SECRET_KEY!, 
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
       },
       async function(token: payLoad, done: VerifiedCallback){
        try{
            const user = await UserModel.findById(token.id);
            if(!user){
                return done(null, false, {message: 'User not found' });
            }
            return done(null, user)
        }catch(error){
            done(error, false);
        }
       }
    )
)

passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async function(email: string, password: string, done: VerifiedCallback){
            try{
                const user = await UserModel.create({email, password});
                if(!user){
                    return done(null, false, {message: 'User registration failed'});
                }
                return done(null, user);
            } catch(error){
                done(error, false);
            }
        }
    )
)

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },

        async function(email: string, password: string, done: VerifiedCallback){
            try{
                const user = await UserModel.findOne({email});
                if(!user){
                    return done(null, false, {message: 'User not found'});
                }

                const validate = await user.comparePassword(password);
                if(!validate){
                    return done(null, false, {message: 'Wrong Password'});
                }

                return done(null, user, {message: 'Logged in Successfully'});
            } catch(error){
                return done(error, false);
            }
        }
    )
)

