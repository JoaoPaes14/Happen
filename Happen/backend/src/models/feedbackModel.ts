import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';


class Feedback extends Model {
    public id!: number;
    public id_evento!: number;
    public id_usuario!: number;
    public nota!: number;
    public comentario!: string;
    public criado_em!: Date;
    public atualizado_em!: Date;  
}

Feedback.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_evento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nota: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        comentario: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        tableName: 'Feedback',  
        timestamps: false, 
        hooks: {
            beforeUpdate: (feedback: any) => {
                feedback.atualizado_em = new Date(); 
            }
        }
    }
);

export default Feedback;
