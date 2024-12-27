import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Notificacao extends Model{
    public id!: number;
    public id_usuario!:number;
    public mensagem!:string;
    public lida!: boolean;
    public criado_em!: Date;
}

Notificacao.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        id_usuario:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        mensagem:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        lida:{
            type:DataTypes.BOOLEAN,
            defaultValue:true,
        },
        criado_em: { 
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: () => new Date(), 
          },
    },
    {
        sequelize,
        tableName: 'Notificacoes',  
        timestamps: false, 
        hooks: {
            beforeUpdate: (usuario: any) => {
      
              usuario.atualizado_em = new Date();
            }
          }    
    }
);


export default Notificacao;