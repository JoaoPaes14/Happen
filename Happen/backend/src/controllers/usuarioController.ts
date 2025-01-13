import { Request, Response } from 'express';
import Usuario from '../models/usuarioModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();



export const criarUsuario = async (req: Request, res: Response): Promise<void> => {
  const { nome, email, senha, tipo } = req.body;

  if (!email || !senha) {
    res.status(400).json({ message: 'Email e senha são obrigatórios' });
    return;
  }

  try {
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      res.status(400).json({ message: 'Formato de email inválido' });
      return;
    }

    if (senha.length < 6) {
      res.status(400).json({ message: 'Senha deve ter pelo menos 6 caracteres' });
      return;
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      res.status(400).json({ message: 'Email já registrado' });
      return;
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      tipo: tipo || 'comum',
    });

    const token = jwt.sign(
      { id: novoUsuario.id, email: novoUsuario.email },
      process.env.JWT_SECRET || 'bia',
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Usuário criado com sucesso', usuario: novoUsuario, token });
  } catch (error: any) {
    console.error('Erro:', error);  
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Email já registrado' });
    } else if (error instanceof Error) {
      res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    } else {
      res.status(500).json({ message: 'Erro ao criar usuário', error: 'Erro desconhecido' });
    }
  }
};
  
export const obterUsuario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter usuário', error });
    }
};

export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            res.status(401).json({ message: 'Senha incorreta' });
            return;
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET || 'bia',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao tentar fazer login', error });
    }
};

export const excluirUsuario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        await usuario.destroy();
        res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir o usuário', error });
    }
};
