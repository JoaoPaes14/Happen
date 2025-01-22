import { Router } from 'express';
import { criarEvento, obterEvento, excluirEvento, listarEventos } from '../controllers/eventoController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { upload } from '../config/multerConfig';

const router = Router();


router.post('/criarEvento', upload.single("imagem"), authMiddleware,criarEvento);

router.get('/obterEvento/:id', authMiddleware, obterEvento);

router.delete('/excluirEvento/:id', authMiddleware, excluirEvento);

router.get('/listarEventos', listarEventos);

export default router;
