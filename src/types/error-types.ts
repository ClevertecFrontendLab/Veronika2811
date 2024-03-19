export type ErrorTypes = {
    status: number;
    data: {
        statusCode: number;
        error: string;
        message: string;
    };
};
