import express from 'express';
import corsConfig from './config/cors';
import envConfig from './config/dotenv'; 
import usuarioRoutes from './routes/usuarioRoutes'
import eventosRoutes from './routes/eventosRoutes'
import feedbackRoutes from './routes/feedbackRoutes'

const app = express();


app.use(express.json());  
app.use(corsConfig);       


app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/feedback', feedbackRoutes)

const PORT = envConfig.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
