interface ErrorResponse {
    error: {
        code?: string;
        message: string;
        details?: string;
        error?: any;
        errorSource?: string;
        status?: number;
    }
}

export class ErrorMiddleware {
    public static axiosError(error: any) {
        const message = error?.response?.data?.message ?? error.message ?? "An error occurred";
        const status = error?.status ?? 400;
        const code = error?.code ?? "UNKNOWN_ERROR";
        const errorResponse: ErrorResponse = {
            error: {
                message,
                error: error,
                errorSource: "axios",
                status: status,
                code: code,
            }
        };  

        return errorResponse;
    }
}



