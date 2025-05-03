// not actually used, you are just overcomplicating things again
import { Response } from 'express';

export class HandleError {
    constructor(private readonly error: Error) {}

    public send(status: number, code: string, message: string, res: Response): void {
        console.error(this.error); // Logs full error to server console

        res.status(status).json({
            error: {
                code,
                message,
                details: this.error.message,
            },
        });
    }
}
