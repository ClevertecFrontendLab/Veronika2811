export type ErrorTypeResponse = {
    status: number;
    data: {
        statusCode: number;
        error: string;
        message: string;
    };
};
