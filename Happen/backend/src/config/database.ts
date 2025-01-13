import { Sequelize } from 'sequelize-typescript'; 
import envConfig from '../config/dotenv';  

const sequelize = new Sequelize({
  database: envConfig.DB_NAME, 
  username: envConfig.DB_USER, 
  password: envConfig.DB_PASSWORD,
  host: envConfig.DB_HOST,
  dialect: 'mysql',
  logging: true,  
  models: [__dirname + '/models'],  
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
};

testConnection();

export { sequelize, testConnection };
