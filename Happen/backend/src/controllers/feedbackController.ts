import { Request,Response } from "express";
import Feedback from "../models/feedbackModel";

export const criarFeedback = async (req:Request, res:Response):Promise<void> =>{
    const{usuarioId,eventoId,comentario,nota}= req.body;
    
    try{
        const novoFeedBack = await Feedback.create({
            usuarioId,
            eventoId,
            comentario,
            nota,
        });

        res.status(201).json({message : 'Feedback criado com sucesso', feedback: novoFeedBack});

    } catch (error) {
        res.status(500).json({message: 'Erro ao criar feedback',error, });
    }
};