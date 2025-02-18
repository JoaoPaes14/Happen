import { Router } from 'express';
import { criarUsuario, obterUsuario, loginUsuario, excluirUsuario } from '../controllers/usuarioController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/criar', criarUsuario); 
router.get('/usuarios/:id', authMiddleware, obterUsuario); 
router.post('/login', loginUsuario); 
router.delete('/usuarios/:id', authMiddleware, excluirUsuario); 

export default router;
