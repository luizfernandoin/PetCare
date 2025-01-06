class HttpError extends Error {
    public statusCode: number;
    public originalError?: Error;

    constructor(message: string, statusCode: number, originalError?: Error) {
        super(message);
        this.statusCode = statusCode;
        this.originalError = originalError;
    }
}


export default HttpError;