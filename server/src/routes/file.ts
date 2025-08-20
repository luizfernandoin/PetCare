import { Request, Response, Router } from "express";
import FileService from "../service/fileService";
import HttpError from "../utils/errors/HttpError";


const router = Router();
const fileService = new FileService();

router.post("/upload-image", fileService.singleUpload, (request: Request, response: Response) => {
    if (!request.file) {
        throw new HttpError("No image was uploaded.", 400);
    }

    const imageUrl = fileService.generateImageUrl(request.file, request);
    
    response.status(200).json({ message: "Image uploaded successfully.", imageUrl });
});


export default router;