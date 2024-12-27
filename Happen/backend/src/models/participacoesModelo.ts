import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Participacao extends Model {
    public id!: number;
    public id_usuario!: number;
    public id_evento!: number;
    public status!: 'confirmado' | 'pendente' | 'cancelado';
    public criado_em!: Date;
    public atualizado_em!: Date;
}

Participacao.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_evento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('confirmado', 'pendente', 'cancelado'),
            defaultValue: 'pendente',
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
        tableName: 'Participacoes',  
        timestamps: false, 
        hooks: {
            beforeUpdate: (participacao: any) => {
                participacao.atualizado_em = new Date();  
            }
        }
    }
);

export default Participacao;
