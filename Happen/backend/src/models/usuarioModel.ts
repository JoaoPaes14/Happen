import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Usuario extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public tipo!: 'comum' | 'organizador';
  public foto_perfil!: string | null;
  public criado_em!: Date;
  public atualizado_em!: Date;
}

Usuario.init(
  {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    nome: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING(100), 
      allowNull: false, 
      unique: true 
    },
    senha: { 
      type: DataTypes.STRING(255), 
      allowNull: false 
    },
    tipo: { 
      type: DataTypes.ENUM('comum', 'organizador'), 
      allowNull: false 
    },
    foto_perfil: { 
      type: DataTypes.STRING(255), 
      allowNull: true 
    },
    criado_em: { 
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,   
    },
    atualizado_em: { 
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW,  
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios',
    timestamps: false, 
    hooks: {
      beforeUpdate: (usuario: any) => {

        usuario.atualizado_em = new Date();
      }
    }
  }
);

export default Usuario;
