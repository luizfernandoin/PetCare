import { NextFunction } from "express-serve-static-core";
import upload from "../config/multer";
import { Request, Response } from "express";

class FileService {
    generateImageUrl(file: Express.Multer.File, req: Request): string {
        return `${req.protocol}://${req.get('host')}/api/uploads/${file.filename}`;
    }

    singleUpload(req: Request, res: Response, next: NextFunction) {
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    message: 'File upload failed. Please ensure the file is a JPEG, JPG, or PNG image.'
                });
            }
            next();
        });
    }

    multipleUploads(req: Request, res: Response, next: NextFunction) {
        upload.array('files', 10)(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    message: 'File uploads failed. Please ensure all files are JPEG, JPG, or PNG images.'
                });
            }
            next();
        });
    }
}

export default FileService;