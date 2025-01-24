import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';


class Notificacao extends Model {
    public id!: number;
    public id_usuario!: number;
    public mensagem!: string;
    public lida!: boolean;
    public criado_em!: Date;
    public atualizado_em!: Date;
}

Notificacao.init(
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
        mensagem: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        lida: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
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
        tableName: 'Notificacoes',  
        timestamps: false, 
        hooks: {
            beforeUpdate: (notificacao: any) => {
                notificacao.atualizado_em = new Date();  
            },
        },
    }
);

export default Notificacao;