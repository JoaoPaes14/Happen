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

export const obterUsuario = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter usuário', error });
    }
};

export const loginUusuario= async(req:Request, res:Response):Promise<Response> =>{
    const{email,senha}= req.body;

    try{

        const usuario = await Usuario.findOne({where:{email}});

        if(!usuario){
            return res.status(404).json({message:'Usuário não encotrado'});

        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if(!senhaValida){

            return res.status(401).json({message: 'Senha incorreta'});
        }

        const token = jwt.sign(
            {
                id: usuario.id, email: usuario.email
            },
            process.env.JWT_SECRET || 'bia',
            {expiresIn: '1h'}

        );
        return res.status(200).json({token});

    }catch(error){
        return res.status(500).json({message: 'Erro ao tentar fazer login',error});
    }
};