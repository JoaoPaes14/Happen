import { Request, Response } from 'express';
import Evento from '../models/eventosModel';
import { Op } from 'sequelize';


export const criarEvento = async (req: Request, res: Response): Promise<void> => {
    const { nome, descricao, local, data_hora, id_organizador } = req.body;
    const imagem = req.file ? req.file.filename : null;

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
            id_organizador,
            imagem
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




export const listarEventos = async (req: Request, res: Response) : Promise<void>=> {
    try {
      const { nome, data_inicial, data_final } = req.query;
  
      const filtros: any = {};
  
      if (nome && typeof nome === 'string') {
        filtros.nome = { $like: `%${nome}%` };
      }
      if (data_inicial && data_final && typeof data_inicial === 'string' && typeof data_final === 'string') {
        filtros.data_hora = {
          $between: [new Date(data_inicial), new Date(data_final)],
        };
      }
  
      const eventos = await Evento.findAll({ where: filtros });
      console.log('Eventos encontrados:', eventos); 
       res.status(200).json({ eventos });
    } catch (error) {
      console.error('Erro ao listar eventos:', error);
       res.status(500).json({ message: 'Erro ao listar eventos' });
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