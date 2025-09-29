// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    'https://certificadosdanieleloy.netlify.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true
}));

app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY || "";
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Obter diretório atual para caminhos absolutos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carrega contexto dos projetos (backend/projects.json)
let PROJECT_CONTEXT = "";
try {
  // Usa caminho absoluto
  const projectsPath = join(__dirname, 'projects.json');
  console.log(`📁 Tentando carregar projects.json de: ${projectsPath}`);
  
  const raw = fs.readFileSync(projectsPath, 'utf8');
  const pj = JSON.parse(raw);
  
  PROJECT_CONTEXT =
    "Daniel Eloy é um desenvolvedor com os seguintes projetos:\n\n" +
    (pj.projects || [])
      .map((p) => 
        `PROJETO: ${p.name}\n` +
        `DESCRIÇÃO: ${p.description}\n` +
        `TIPO: ${p.type}\n` +
        `TECNOLOGIAS: ${p.technologies || 'HTML, CSS, JavaScript'}\n` +
        `URL: ${p.url_network || 'Não disponível'}\n` +
        `---`
      )
      .join("\n") +
    "\n\nInstrução: Responda sempre com base específica nestes projetos, mencionando detalhes técnicos quando relevante.";
  
  console.log("✅ Projects.json carregado com sucesso!");
  console.log(`📊 ${pj.projects?.length || 0} projetos carregados`);
} catch (err) {
  PROJECT_CONTEXT = `
  Daniel Eloy tem os seguintes projetos:

  PROJETO: Portfólio
  DESCRIÇÃO: Me apresentando e mostrando minha trajetória
  TIPO: folder
  URL: https://portifolio-daniel-eloy.netlify.app/

  PROJETO: Certificados
  DESCRIÇÃO: Projeto de gestão dos certificados de conclusão
  TIPO: folder
  URL: https://certificadosdanieleloy.netlify.app

  PROJETO: Projeto 01
  DESCRIÇÃO: Desenvolvendo a primeira landing page do curso
  TIPO: challenge
  URL: https://dnc-desafio01-landing-page.netlify.app/

  PROJETO: Projeto 02
  DESCRIÇÃO: Desenvolvendo site com responsividade usando CSS e Media Queries
  TIPO: challenge
  URL: https://dnc-desafio-02.netlify.app/

  PROJETO: Projeto 03
  DESCRIÇÃO: Desenvolvendo site com JavaScript
  TIPO: challenge
  URL: https://dnc-desafio03.netlify.app/

  PROJETO: Projeto 04
  DESCRIÇÃO: Desenvolvendo site com React, CSS e JavaScript
  TIPO: challenge
  URL: https://dnc-desafio04.netlify.app/

  PROJETO: Projeto 05
  DESCRIÇÃO: Desenvolvendo site com Node.js e TypeScript
  TIPO: challenge
  URL: https://dnc-desafio05.netlify.app/

  PROJETO: Projeto 06
  DESCRIÇÃO: Desenvolvendo com Node.js, TypeScript painel de monitoramento de vendas
  TIPO: challenge
  URL: https://dnc-desafio06.netlify.app/

  PROJETO: Projeto 07
  DESCRIÇÃO: NPM (node Package manager), lib para contagem de data e disponibilizando no NPM
  TIPO: challenge
  URL: https://dnc-desafio07.netlify.app/

  PROJETO: Documentação
  DESCRIÇÃO: README do projeto
  TIPO: file
  URL: https://github.com/DanielEloy/DNC_TechLead/blob/main/README.md
  `;
  
  console.error("❌ Erro ao carregar projects.json, usando contexto manual:", err.message);
}

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.trim() === "")
      return res.status(400).json({ error: "Mensagem vazia" });

    const full_prompt = `${PROJECT_CONTEXT}

PERGUNTA DO USUÁRIO: ${message}

Com base nos projetos listados acima, responda de forma específica e técnica:`;

    console.log(`💬 Chat request: "${message.substring(0, 50)}..."`);

    const payload = {
      contents: [{ parts: [{ text: full_prompt }] }],
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
        topP: 0.8,
      },
    };

    const full_url = `${BASE_URL}?key=${API_KEY}`;

    const response = await axios.post(full_url, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 30000,
    });

    const data = response.data || {};
    const bot_response =
      (data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0].text) ||
      "⚠️ Não consegui gerar resposta";

    console.log(`🤖 Resposta gerada: ${bot_response.substring(0, 100)}...`);

    return res.json({
      response: bot_response,
      timestamp: new Date().toISOString(),
      status: "success",
    });
  } catch (err) {
    console.error("Erro /api/chat:", err?.response?.data || err.message || err);
    return res
      .status(500)
      .json({ 
        error: "Erro interno ao gerar resposta", 
        details: err.message,
        status: "error" 
      });
  }
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    service: "DNC Chat API - Daniel Eloy",
    projects: 10,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

app.get("/api/projects", (req, res) => {
  try {
    const projectsPath = join(__dirname, 'projects.json');
    const raw = fs.readFileSync(projectsPath, 'utf8');
    const projects = JSON.parse(raw);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ 
      error: "Não foi possível carregar os projetos",
      details: err.message 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 Chat endpoint: http://localhost:${PORT}/api/chat`);
});