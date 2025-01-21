import app from './app'; 
import dotenv from 'dotenv';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3001', 10); 

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://192.168.252.247:${PORT}`);
});
