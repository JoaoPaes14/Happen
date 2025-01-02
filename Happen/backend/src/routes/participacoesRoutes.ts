import { Router } from 'express';
import { criarParticipacao,listarParticipacao } from '../controllers/participacoesController';

const router = Router();

router.post('/participacao', criarParticipacao);

router.get('/participacoes', listarParticipacao);



export default router;