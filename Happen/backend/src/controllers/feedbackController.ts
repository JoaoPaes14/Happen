import { Request,Response } from "express";
import Feedback from "../models/feedbackModel";
import { json } from "body-parser";

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

export const listarFeedback = async(req:Request, res:Response):Promise<void> =>{
    try{
        const feedback = await Feedback.findAll();
        res.status(200).json(feedback);
    }catch(error){
        res.status(500).json({message:'Erro ao listar feedbacks',error});

    }
};