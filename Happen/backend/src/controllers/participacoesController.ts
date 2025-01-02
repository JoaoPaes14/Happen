import { Request,Response } from "express";
import Participacao from "../models/participacoesModelo";

export const criarParticipacao = async (req:Request, res:Response):Promise<void> =>{
    const{id_evento,id_usuario}= req.body;

    try{
        const novaParticipacao = await Participacao.create({
            id_evento,
            id_usuario,
        });

        res.status(201).json({message:'Participação criada com sucesso',participacao : novaParticipacao});
   
    }catch(error){
        res.status(500).json({ message: 'Erro ao criar participação.',error,});

    }
    
};