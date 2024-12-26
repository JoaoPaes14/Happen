# Sistema de Gerenciamento de Eventos Happen

## Descrição
O Sistema de Gerenciamento de Eventos Happen é uma aplicação projetada para facilitar o gerenciamento de eventos, permitindo que usuários se cadastrem, participem de eventos, enviem feedback e organizadores criem e administrem suas próprias iniciativas. Agora adaptado para utilizar React Native no frontend, Node.js com TypeScript no backend, e MySQL como banco de dados.

## Tecnologias Utilizadas
- **Frontend**: React Native .
- **Backend**: Node.js com TypeScript.
- **Banco de Dados**: MySQL, utilizando Sequelize como ORM.
- **Gerenciamento de Pacotes**: npm.
- **Ferramentas Auxiliares**:
  - Expo CLI (para desenvolvimento móvel).



## Como Rodar o Projeto
### Pré-requisitos
- Node.js (>= 14.x)
- MySQL (>= 8.x)
- NPM ou Yarn
- Expo CLI

### Configuração do Ambiente
1. Clone o repositório:
   ```bash
   git clone https://github.com/JoaoPaes14/Happen
   ```
2. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
   ```
5. Rode as migrações para criar o banco de dados:
   ```bash
   npx sequelize db:migrate
   ```
6. Inicie o servidor backend:
   ```bash
   npm run dev
   ```
7. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```
8. Instale as dependências:
   ```bash
   npm install
   ```
9. Inicie o servidor frontend:
   ```bash
   npm run start
   ```

### Acesso ao Sistema
- Frontend: Disponível no emulador Expo.
- Backend: [http://localhost:5000](http://localhost:5000)


