import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    const status = err.status || 500;
    const message = err.message || 'Erro interno no servidor';

    res.status(status).json({ message, error: err });
};
