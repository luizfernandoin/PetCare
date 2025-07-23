type ApiResponse<T> = {
    message: string;
    data?: T;
    token?: string; 
}


export {
    ApiResponse,
}