![UCD](./artifacts/Petcare+.png)
![CD](./artifacts/petCare-CD.png)
![ERD](./artifacts/petcare-ER.png)
![LM](./artifacts/petcare-logico-FN.png)

**Usuário** (<u>id</u>, email, nome, telefone, uf, cidade, rua, bairro, num, tipo) \
**Especializações** (<u>idUser</u>, <u>especialização</u>) \
**Certificados** (<u>idUser</u>, <u>certificado</u>) \
**Clinica** (<u>id</u>, nome, telefone, latitude, longitude) \
**ProfissionalTrabalhaClinica** (<u>idClinica</u>, <u>idUser</u>) \
**HorariosAtendimento** (<u>id</u>, dia, horaInicio, horaFim, idClinica) \
**Serviço** (<u>id</u>, tipo, data, idClinica) \
**ObservaçoesServiço** (<u>id</u>, observações, idServiço) \
**Vacina** (<u>id_Serviço</u>, nome, validade, fabricante, lote) \
**Pet** (<u>id</u>, nome, idade, porte, raça,características, foto, historicoMedico, idUser) \
**ProfissionalAtendePetServiço** (<u>idUser</u>, <u>idPet</u>, <u>idServiço</u>, preco, dataAtendimento, horaAtendimento) \
**TutorAgendaServiçoPet** (<u>idUser</u>, <u>idServiço</u>, <u>idPet</u>, <u>idClinica</u>, status, data, horarioInicio, horarioFim) \
**Avaliação** (<u>id</u>, nota, comentario) \
**UsuarioAvaliaServiço** (<u>idUser</u>, <u>idServiço</u>, <u>idAvaliação</u>)

# Petcare+ - Guia de Instalação e Execução

Este guia irá ajudá-lo a configurar e executar o projeto Petcare+, que consiste em um frontend (React + Vite) e um backend (Node.js + Express).

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior)
- **npm** (geralmente vem com o Node.js)
- **PostgreSQL** (versão 12 ou superior)
- **Git**

## 🗄️ Configuração do Banco de Dados

1. Instale e configure o PostgreSQL em sua máquina
2. Crie um banco de dados chamado `petcare`:
   ```sql
   CREATE DATABASE petcare;
   ```
3. Verifique se o PostgreSQL está rodando na porta padrão (5432)

## 📥 Clonando o Repositório

```bash
git clone https://github.com/luizfernandoin/PetCare.git
cd petcare
```

## ⚙️ Configuração do Backend (Server)

1. Navegue até a pasta do servidor:
   ```bash
   cd server
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na pasta `server/`
   - Copie o conteúdo do exemplo fornecido e ajuste conforme necessário:
   ```env
   # DataBase
   DB_NAME=petcare
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_HOST=localhost
   DB_PORT=5432
   
   # Authentication_Key
   SECRET_KEY=your-secret-key
   
   # Server port
   PORT=3000
   
   # Nominatim
   EMAIL_AGENT="email_pessoal@gmail.com"
   ```

4. Execute as migrações do banco de dados (se aplicável):
   ```bash
   npx prisma migrate dev
   ```
   ou
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Inicie o servidor em modo desenvolvimento:
   ```bash
   npm run start:dev
   ```
   
   Ou para produção:
   ```bash
   npm run build
   npm start
   ```

O servidor estará rodando em `http://localhost:3000`

## ⚛️ Configuração do Frontend

1. Abra um novo terminal e navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O frontend estará rodando em `http://localhost:5173` (porta padrão do Vite)

## 🧪 Executando Testes

### Frontend
```bash
cd frontend
npm run test
```

### Backend
```bash
cd server
npm test
```

## 🌐 Instalação do Playwright (para testes E2E)

O frontend utiliza Playwright para testes end-to-end. Para instalar os browsers necessários:

```bash
cd frontend
npx playwright install
```

## 🚀 Scripts Úteis

### Backend
- `npm run start:dev` - Inicia o servidor em modo desenvolvimento com nodemon
- `npm run build` - Compila o TypeScript
- `npm start` - Inicia o servidor em produção

### Frontend
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa ESLint
- `npm run test` - Executa testes unitários

## 📁 Estrutura do Projeto

```
petcare/
├── server/                 # Backend API
│   ├── src/
│   │   └── server.ts      # Ponto de entrada do servidor
│   ├── .env               # Variáveis de ambiente
│   └── package.json
├── frontend/              # Aplicação React
│   ├── src/
│   └── package.json
└── README.md
```

## ❗ Solução de Problemas Comuns

1. **Erro de conexão com o banco de dados**:
   - Verifique se o PostgreSQL está rodando
   - Confirme as credenciais no arquivo `.env`

2. **Erro de porta já em uso**:
   - Altere a porta no arquivo `.env` do servidor
   - Ou mate o processo usando a porta: `npx kill-port 3000`

3. **Erro de dependências**:
   - Delete as pastas `node_modules` e `package-lock.json`
   - Execute `npm install` novamente

4. **Problemas com o Playwright**:
   - Execute `npx playwright install` para reinstalar os browsers

## 🤝 Contribuindo

Para contribuir com o projeto, siga o fluxo padrão de Git:
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo LICENSE para mais detalhes.

---

## 📊 Diagramas do Sistema

![UCD](./artifacts/Petcare+.png)
![CD](./artifacts/petCare-CD.png)
![ERD](./artifacts/petcare-ER.png)
![LM](./artifacts/petcare-logico-FN.png)