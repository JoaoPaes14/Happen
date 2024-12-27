import { Request, Response } from 'express';
import Usuario from '../models/usuarioModel'; 
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const criarUsuario = async(req: Request, res:Response):Promise<Response> =>{
    const {nome,email,senha}= req.body;

    try {
       
        const usuarioExistente = await Usuario.findOne({ where: { email } });

        if (usuarioExistente) {
            return res.status(400).json({ message: 'Email já registrado' });
        }
   
        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUsuario = await Usuario.create({
            nome,
            email,
            senha: senhaHash,
        });

        return res.status(201).json({ message: 'Usuário criado com sucesso', usuario: novoUsuario });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
};

