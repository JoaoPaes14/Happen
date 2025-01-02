import { Router } from 'express';
import { criarNotificacao,listarNotificacoes } from '../controllers/notificacaoController';

const router = Router();

router.post('/notificacao', criarNotificacao);

router.get('/notificacao', listarNotificacoes);


export default router;