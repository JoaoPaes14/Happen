import { Router } from 'express';
import { criarFeedback,listarFeedback,obterFeedback,excluirFeedback } from '../controllers/feedbackController';

const router = Router();

router.post('/feedback', criarFeedback);

router.get('/feedback', listarFeedback);

router.get('/feedback/:id', obterFeedback);

router.delete('/feedback/:id', excluirFeedback);

export default router;
