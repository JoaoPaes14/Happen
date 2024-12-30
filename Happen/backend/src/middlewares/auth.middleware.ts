import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'bia') as string | JwtPayload;
        req.user = decoded; // Agora reconhecido pelo TypeScript
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};
