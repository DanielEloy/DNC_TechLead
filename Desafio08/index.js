//index.js
import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import bookRoutes from "./src/routes/book.routes.js";
import loanRoutes from "./src/routes/loan.routes.js";
import { logger } from "./src/utils/logger.js";
import dotenv from "dotenv";

// Carrega variáveis conforme NODE_ENV
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

// Cria a aplicação Express
const app = express();

// Middlewares
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/api", userRoutes);
app.use("/api", bookRoutes);
app.use("/api", loanRoutes);

// Inicia o servidor
app.listen(process.env.PORT, () => {
  logger.debug(`Environment: ${process.env.Environment}`);
  logger.debug(`Server running at http://localhost:${process.env.PORT}`)
});

export default app;