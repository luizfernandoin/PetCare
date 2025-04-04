import { NextFunction } from "express-serve-static-core";
import upload from "../config/multer";
import { Request, Response } from "express";


class FileService {
    generateImageUrl(file: Express.Multer.File, req: Request): string {
        return `${req.protocol}://${req.get('host')}/api/uploads/${file.filename}`;
    };

    singleUpload(req: Request, res: Response, next: NextFunction) {
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).json({ message: 'Falha no upload do arquivo. Verifique se o arquivo é uma imagem JPEG, JPG ou PNG.' });
            }
            next();
        });
    };

    multipleUploads(req: Request, res: Response, next: NextFunction) {
        upload.array('files', 10)(req, res, (err) => {
            if (err) {
                return res.status(400).json({ message: 'Falha no upload das imagens. Verifique se os arquivos são imagens JPEG, JPG ou PNG.' });
            }
            next();
        });
    }
};


export default FileService;