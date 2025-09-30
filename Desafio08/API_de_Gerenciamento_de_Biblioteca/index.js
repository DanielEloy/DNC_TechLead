//index.js
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { routers } from "./src/routes/index.js";
import { logger } from "./src/utils/logger.js";

// Forçar NODE_ENV se não estiver definido
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const env = process.env.NODE_ENV;

// Obter o diretório atual no ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega variáveis APENAS do arquivo .env.<env>
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });

// Verifique se as variáveis foram carregadas corretamente
logger.debug({
  message: "📦 Environment variables loaded",
  details: {
    "🌍 Environment": process.env.NODE_ENV,
    "🚪 Port": process.env.PORT,
    "📧 Email user": process.env.EMAIL_USER,
    "🔒 Email password": process.env.EMAIL_PASS ? "******" : "❌ Not defined",
    "📋 Loaded file": `.env.${env}`
  }
});
// Verificação de variáveis obrigatórias
const requiredEnvVars = ['PORT', 'JWT_SECRET', 'EMAIL_USER', 'EMAIL_PASS'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`❌ Variável de ambiente obrigatória não definida: ${varName}`);
    process.exit(1);
  }
});



// Cria a aplicação Express
const app = express();

// Middlewares
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/api", routers);

// Importe e inicialize o cron service APÓS as variáveis de ambiente estarem carregadas
import('./src/service/cron.services.js')
  .then(() => {
    logger.info("Cron service initialized successfully");
  })
  .catch((error) => {
    logger.error("Failed to initialize cron service:", error);
  });

// Inicia o servidor
app.listen(process.env.PORT, () => {
  logger.info(`Environment: ${process.env.NODE_ENV}`);
  logger.info(`Server running at http://localhost:${process.env.PORT}`);
});

export default app;