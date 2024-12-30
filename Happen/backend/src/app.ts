import express from 'express';
import corsConfig from './config/cors';
import envConfig from './config/dotenv'; 
import usuarioRoutes from './routes/usuarioRoutes'

const app = express();


app.use(express.json());  
app.use(corsConfig);       


app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

app.use('/api', usuarioRoutes);

const PORT = envConfig.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
