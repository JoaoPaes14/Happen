import { Request,Response } from "express";
import Notificacao from "../models/notificacaoModel";

export const criarNotificacao = async (req: Request, res: Response): Promise<void> => {
    const { id_usuario, mensagem } = req.body;

    try {
        if (!id_usuario || !mensagem) {
            res.status(400).json({ message: 'Usuário e mensagem são obrigatórios' });
            return;
        }

 
        const novaNotificacao = await Notificacao.create({
            id_usuario,
            mensagem,
        });

        res.status(201).json({ message: 'Notificação criada com sucesso', notificacao: novaNotificacao });
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao criar notificação', error: error.message });
    }
};

export const listarNotificacoes = async (req: Request, res: Response): Promise<void> => {
    const { id_usuario } = req.params;

    try {
        const notificacoes = await Notificacao.findAll({
            where: { id_usuario },
            order: [['criado_em', 'DESC']], 
        });

        if (notificacoes.length === 0) {
            res.status(404).json({ message: 'Nenhuma notificação encontrada' });
            return;
        }

        res.status(200).json({ notificacoes });
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao listar notificações', error: error.message });
    }
};