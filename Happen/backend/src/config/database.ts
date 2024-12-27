import { Sequelize } from 'sequelize';
import envConfig from '../config/dotenv';


const sequelize = new Sequelize(
  envConfig.DB_NAME, 
  envConfig.DB_USER, 
  envConfig.DB_PASSWORD, 
  {
    host: envConfig.DB_HOST,
    dialect: 'mysql',
    port: parseInt(envConfig.DB_PORT, 10),
    logging: true, 
  }
);


const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
};

testConnection();

export default sequelize;
