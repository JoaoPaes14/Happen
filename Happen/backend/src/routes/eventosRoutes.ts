import { Router } from 'express';
import { criarEvento, obterEvento, excluirEvento, listarEventos } from '../controllers/eventoController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();


router.post('/criarEvento', criarEvento);

router.get('/obterEvento/:id', authMiddleware, obterEvento);

router.delete('/excluirEvento/:id', authMiddleware, excluirEvento);

router.get('/listarEventos', authMiddleware, listarEventos);

export default router;
