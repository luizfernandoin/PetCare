export interface Response {
    status: number;
    message: string;
    data?: T;
    errors?: string[];
    error?: string;
}