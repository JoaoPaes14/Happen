import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';


class Evento extends Model {
    public id!: number;
    public nome!: string;
    public descricao!: string;
    public local!: string;
    public data_hora!: Date;
    public id_organizador!: number;
    public criado_em!: Date;
    public atualizado_em!: Date;
}

Evento.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        local: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        data_hora: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        id_organizador: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        criado_em: { 
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: () => new Date(), 
          },
        atualizado_em: { 
            type: DataTypes.DATE, 
            allowNull: false,
            defaultValue: () => new Date(), 
          },
    },
    {
        sequelize,
        tableName: 'Eventos',  
        timestamps: false, 
        hooks: {
            beforeUpdate: (usuario: any) => {
      
              usuario.atualizado_em = new Date();
            }
          }    
    }
);

export default Evento;
