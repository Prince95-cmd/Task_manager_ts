import express, {Request, Response} from 'express';
import taskModel from '../model/task';

const taskRouter = express.Router();

interface AppError extends Error {
    status?: number
}

// Get all tasks
taskRouter.get('/', async (_req: Request, res: Response): Promise<void> =>  {
    try{
        const allTasks = await taskModel.find();

        res.status(200).send({
            message: "All tasks fetched successfully",
            data: allTasks
        })
    } catch(err: unknown){ 
        
        // Safely narrow down the error type
        if((err as AppError).status){
            
            // Custom AppError(with status)
            const appError = err as AppError;
            res.status(appError.status || 500).json({
                message: appError.message || 'Something went wrong'
            })
        } else if (err instanceof Error) {
            // Generic Error
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            })
        } else {
            // Unknown error type
            res.status(500).json({
                message: 'An unknown error occurred'
            })
        }
    }
})

export default taskRouter;