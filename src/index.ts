import express, {Request, Response, NextFunction} from 'express';
import connectToMongoDB from './db';
import taskRouter from './routes/task';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

connectToMongoDB();

let PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/tasks', taskRouter);

interface AppError extends Error {
    status?: number
}

app.get('/', (_req: Request, res: Response) => {
    res.send('Task manager api in typescript')
    console.log('Task manager api in typescript')
})

app.use((err: AppError, _req: Request, res: Response, _next: NextFunction)=>{
    console.error(err);
    res.status(err.status || 500)
    res.json({
        error: err.message || 'Internal Server Error'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})