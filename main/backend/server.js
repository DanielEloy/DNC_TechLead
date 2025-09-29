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
  
  PROJECT_CONTEXT = `Daniel Eloy é um desenvolvedor Full Stack com os seguintes projetos:

${(pj.projects || [])
  .map((p, index) => 
    `PROJETO ${index + 1}: ${p.name}
Descrição: ${p.description}
Tipo: ${p.type}
Tecnologias: ${p.technologies || 'HTML, CSS, JavaScript, React, Node.js'}
URL: ${p.url_network || 'Não disponível'}
---`
  )
  .join("\n")}

INSTRUÇÕES IMPORTANTES PARA O ASSISTENTE:
1. Você é um especialista técnico analisando o portfólio de Daniel Eloy
2. SEMPRE responda com base específica nos projetos listados acima
3. Quando perguntarem sobre tecnologias, mencione as usadas em cada projeto
4. Seja técnico e específico, evitando respostas genéricas
5. Foque nas stacks tecnológicas e desafios de cada projeto`;
  
  console.log("✅ Projects.json carregado com sucesso!");
  console.log(`📊 ${pj.projects?.length || 0} projetos carregados`);
} catch (err) {
  console.error("❌ Erro ao carregar projects.json:", err.message);
  PROJECT_CONTEXT = "Não há informações de projetos disponíveis no momento.";
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