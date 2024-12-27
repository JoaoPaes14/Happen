import cors from 'cors';


const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
};

const corsConfig = cors(corsOptions);

export default corsConfig;
