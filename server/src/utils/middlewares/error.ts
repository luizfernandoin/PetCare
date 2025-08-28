import { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/HttpError';


const errorMiddleware = (
    err: HttpError, 
    request: Request, 
    response: Response, 
    next: NextFunction
) => {
    response.status(err.statusCode || 500).json({
        error: err.message || 'Internal server error!',
    });

    next();
};

export default errorMiddleware;