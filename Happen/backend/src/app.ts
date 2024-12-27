import express from 'express';
import cors from 'cors';
import envConfig from './config/dotenv'; 

const app = express();


app.use(express.json());  
app.use(cors());          


app.get('/', (req, res) => {
  res.send('API está funcionando!');
});


const PORT = envConfig.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
