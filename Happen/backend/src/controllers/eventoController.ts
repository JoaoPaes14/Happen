import { Request, Response } from 'express';
import Evento from '../models/eventosModel';
import { Op } from 'sequelize';


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
        res.status(500).json({ message: 'Erro ao criar evento', error: error.message });


    }

};

export const obterEvento = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const evento = await Evento.findByPk(id);

        if (!evento) {
            res.status(404).json({ message: 'Evento não encontrado' });
            return;
        }
        res.status(200).json(evento);
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao obter evento', error: error.message });
    }
};




export const listarEventos = async (req: Request, res: Response): Promise<void> => {
    const { nome, data_inicial, data_final } = req.query;

    try {
        let filtros: any = {};


        if (nome) {
            filtros.nome = { [Op.like]: `%${nome}%` };
        }

        if (data_inicial && data_final) {

            const dataInicial = Array.isArray(data_inicial) ? data_inicial[0] : data_inicial;
            const dataFinal = Array.isArray(data_final) ? data_final[0] : data_final;


            if (typeof dataInicial === 'string' && typeof dataFinal === 'string') {
                filtros.data_hora = { [Op.between]: [new Date(dataInicial), new Date(dataFinal)] };
            }
        }


        const eventos = await Evento.findAll({
            where: filtros,
            include: ['organizador'],
        });

        res.status(200).json({ eventos });
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao listar eventos', error: error.message });
    }
};

export const excluirEvento = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const evento = await Evento.findByPk(id);

        if (!evento) {
            res.status(404).json({ message: 'Evento não encotrado' });
            return;
        }

        await evento.destroy();
        res.status(200).json({ message: 'Evento excluído com sucesso' });
   
    }catch(error: any){
        res.status(500).json({message:'Erro ao excluir evento',error: error.message});

    }
};