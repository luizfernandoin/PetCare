import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodEffects, ZodError, ZodObject } from "zod";
import { urlParamsSchema } from "../validators/paramsValidation";


const validate = (schema: AnyZodObject | ZodEffects<AnyZodObject>) => (request: Request, response: Response, next: NextFunction) => {
    try {
        schema.parse(request.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            response.status(400).json({ errors: error.format() });
        }
        next(error);
    }
};

const validateParams = (schema: typeof urlParamsSchema) => (request: Request, response: Response, next: NextFunction) => {
    try {
        schema.parse(request.params);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            response.status(400).json({ errors: error.errors.map(err => err.message) });
        }
        next(error);
    }
};

export { validate, validateParams };
