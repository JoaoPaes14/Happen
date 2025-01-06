export interface User {
    id: number;
    nome: string;
    email: string;
    tipo: 'comum' | 'organizador';
    foto_perfil: string | null;
    criado_em: Date;
    atualizado_em: Date;
  }
  