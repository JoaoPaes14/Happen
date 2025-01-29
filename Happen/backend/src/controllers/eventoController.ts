import { Request, Response } from "express";
import Evento from "../models/eventosModel";
import { Op } from "sequelize";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3001/uploads/"; 

export const criarEvento = async (req: Request, res: Response): Promise<void> => {
  const { nome, descricao, local, data_hora, id_organizador } = req.body;
  const imagem = req.file ? req.file.filename : null;

  
  if (!nome || !descricao || !local || !data_hora || !id_organizador) {
    res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    return;
  }

  
  if (!imagem) {
    res.status(400).json({ message: "A imagem é obrigatória" });
    return;
  }

  try {
    const novoEvento = await Evento.create({
      nome,
      descricao,
      local,
      data_hora,
      id_organizador,
      imagem,
    });

    const eventoComImagem = {
      ...novoEvento.toJSON(),
      imagemUrl: `${BASE_URL}${novoEvento.imagem}`,
    };

    res.status(201).json({ message: "Evento criado com sucesso", evento: eventoComImagem });
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar evento", error: error.message });
  }
};

// Listar Eventos
export const listarEventos = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventos = await Evento.findAll();

    
    const eventosComImagem = eventos.map((evento) => ({
      ...evento.toJSON(),
      imagemUrl: evento.imagem ? `${BASE_URL}${evento.imagem}` : null,
    }));

    res.status(200).json({ eventos: eventosComImagem });
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao listar eventos", error: error.message });
  }
};

// Obter Evento por ID
export const obterEvento = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  console.log("ID recebido no backend:", id); 

  try {
    const evento = await Evento.findByPk(id);

    if (!evento) {
      console.log("Evento não encontrado para o ID:", id); 
      res.status(404).json({ message: "Evento não encontrado" });
      return;
    }

    const eventoComImagem = {
      ...evento.toJSON(),
      imagemUrl: evento.imagem ? `${BASE_URL}${evento.imagem}` : null,
    };

    res.status(200).json(eventoComImagem);
  } catch (error: any) {
    console.error("Erro ao obter evento:", error);
    res.status(500).json({ message: "Erro ao obter evento", error: error.message });
  }
};


// Excluir Evento
export const excluirEvento = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const evento = await Evento.findByPk(id);

    if (!evento) {
      res.status(404).json({ message: "Evento não encontrado" });
      return;
    }

   
    if (evento.imagem) {
      const imagemPath = path.join(__dirname, "../../uploads", evento.imagem);
      if (fs.existsSync(imagemPath)) {
        fs.unlinkSync(imagemPath);
      }
    }

    await evento.destroy();
    res.status(200).json({ message: "Evento excluído com sucesso" });
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao excluir evento", error: error.message });
  }
};

