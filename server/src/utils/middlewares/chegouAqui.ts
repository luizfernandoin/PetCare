import { Request, Response, NextFunction } from "express";


export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`🌐 [${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
};

export const detailedRequestLogger = (customMessage?: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const timestamp = new Date().toISOString();
        const message = customMessage || "➡️  Request received";
        console.log(`📨 [${timestamp}] ${message}: ${req.method} ${req.originalUrl}`);
        console.log(`   Query:`, req.query);
        console.log(`   Params:`, req.params);
        if (Object.keys(req.body).length > 0) {
            console.log(`   Body:`, req.body);
        }
        next();
    };
};