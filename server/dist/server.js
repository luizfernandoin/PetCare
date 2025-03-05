"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = __importDefault(require("./config/sequelize"));
const routes_1 = __importDefault(require("./routes/routes"));
const error_1 = __importDefault(require("./utils/middlewares/error"));
//import { injectDb } from './middlewares/injectDb.mjs';
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.use(error_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
sequelize_1.default.sync().then(() => {
    console.log('Conectado ao BD');
});
