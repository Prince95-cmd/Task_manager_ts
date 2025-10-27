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

        res.status(200).json({
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

// Create a new task
taskRouter.post('/', async (req: Request, res:Response): Promise<void>  => {
    // Get task data from request body
    const taskData = req.body
    console.log(taskData);

    try{
        // Create a new task in the database
        const newTask = await taskModel.create(taskData);
        console.log(newTask);

        // Send success response
        res.status(201).json({
            message: "Task created successfully",
            data: newTask
        })
    } catch(err: unknown){
        // Safely narrow down the error type
        if((err as AppError).status){
            // Custom AppError(with status)
            const appError = err as AppError;
            res.status(appError.status || 500).json({
                message: appError.message || 'Something went wrong'
            })
        } else if(err instanceof Error){
            // Generic Error
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            })
        } else{
            // Unknown error type
            res.status(500).json({
                message: 'An unknown error occurred'
            })
        }
    }
    
})

// Get a specific task by ID
taskRouter.get('/:id', async (req: Request, res: Response): Promise<void> => {
    // Get task id from request params
    const taskId = req.params.id;
    console.log("Task id:",taskId);

    try{
        // Find the task by ID in the database
        const task = await taskModel.findById(taskId);
        if(!task){
            res.status(404).json({
                message: "Task not found"
            });
            return;
        }
        // Send success response
        res.status(200).json({
            message: "Task fetched successfully",
            data: task
        })
        console.log(task);
    } catch(err: unknown){
        // Safely narrow down the error type
        if((err as AppError).status){

            // Custom AppError(with status)
            const appError = err as AppError;
            res.status(appError.status || 500).json({
                message: appError.message || 'Something went wrong'
            })
        } else if(err instanceof Error){
            // Generic Error
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            })
        } else{
            // Unknown error type
            res.status(500).json({
                message: 'An unknown error occurred'
            })
        }
    }
})

// Update a specific task by ID
taskRouter.put('/:id', async (req: Request, res: Response): Promise<void> => {
    // Get task id from request params
    const taskId = req.params.id;
    console.log("Task id:",taskId);

    // Get updated task data from request body
    const updatedTaskData = req.body;
    console.log("Updated task data:",updatedTaskData);

    try{
        // Find the task by ID and update it in the database
        const updatedTask = await taskModel.findByIdAndUpdate(taskId, updatedTaskData, {new: true});
        if(!updatedTask){
            res.status(404).json({
                message: "Task not found"
            });
            return;
        }

        res.status(200).json({
            message: "Task updated successfully",
            data: updatedTask
        })
        console.log(updatedTask);
    } catch(err: unknown){
        // Safely narrow down the error type
        if((err as AppError).status){
            // Custom AppError(with status)
            const appError = err as AppError;
            res.status(appError.status || 500).json({
                message: appError.message || 'Something went wrong'
            })
        } else if(err instanceof Error){
            // Generic Error
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            })
        } else{
            // Unknown error type
            res.status(500).json({
                message: 'An unknown error occurred'
            })
        }
    }
})

// Delete a specific task by ID from the database
taskRouter.delete('/:id', async (req: Request, res: Response): Promise<void> =>{
    // Get task id from request params
    const taskId = req.params.id
    console.log(taskId);

    try{
        const deleteTask = await taskModel.findByIdAndDelete(taskId)
        if(!deleteTask){
            res.status(404).json({
                message: "Task not found"
            })
            return;
        }

        res.status(200).json({
            message: "Task deleted successfully",
            data: deleteTask
        })
        console.log(deleteTask);
    } catch(err: unknown){
        if((err as AppError).status){
            // Custom AppError(with status)
            const appError = err as AppError;
            res.status(appError.status || 500).json({
                message: appError.message || 'Something went wrong'
            })
        } else if(err instanceof Error){
            // Generic Error
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            })
        }
    }
})

export default taskRouter;