import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface CustomRequest extends Request {
    user?: string | jwt.JwtPayload;
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'Token não fornecido' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'bia');
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};
