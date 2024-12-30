import { Router } from 'express';
import { criarUsuario, obterUsuario, loginUsuario, excluirUsuario } from '../controllers/usuarioController';

const router = Router();

router.post('/criar', criarUsuario); 
router.get('/:id', obterUsuario);
router.post('/login', loginUsuario);
router.delete('/:id', excluirUsuario);

export default router;
