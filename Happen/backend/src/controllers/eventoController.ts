import { Request, Response } from 'express';
import Evento from '../models/eventosModel';


export const criarEvento = async (req: Request, res: Response): Promise<void> => {
    const { nome, descricao, local, data_hora, id_organizador } = req.body;

    try {
        if (!nome || !descricao || !local || !data_hora || !id_organizador) {
            res.status(400).json({ message: 'Campos obrigatórios não fornecidos' });
            return;
        }
        const novoEvento = await Evento.create({
            nome,
            descricao,
            local,
            data_hora,
            id_organizador
        });
        res.status(201).json({ message: 'Evento criado com sucesso', evento: novoEvento });
    } catch (error: any) {
        res.status(500).json({message:'Erro ao criar evento',error: error.message});


    }

};