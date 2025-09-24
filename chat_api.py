from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests
from datetime import datetime

# Carregar variáveis de ambiente
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configurações
API_KEY = os.getenv("GEMINI_API_KEY")
BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

# CONTEXTO ESPECÍFICO DOS PROJETOS
PROJECT_CONTEXT = """ 
... (mantém todo o conteúdo do seu PROJECT_CONTEXT)
"""

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '').strip()

        if not user_message:
            return jsonify({'error': 'Mensagem vazia'}), 400

        full_prompt = f"""{PROJECT_CONTEXT}

PERGUNTA DO USUÁRIO: {user_message}

Com base nos 10 projetos listados acima, responda de forma específica e técnica:"""

        headers = {'Content-Type': 'application/json'}
        payload = {
            "contents": [{"parts": [{"text": full_prompt}]}],
            "generationConfig": {
                "maxOutputTokens": 800,
                "temperature": 0.7,
                "topP": 0.8
            }
        }

        full_url = f"{BASE_URL}?key={API_KEY}"
        response = requests.post(full_url, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()

        bot_response = (
            data.get("candidates", [{}])[0]
                .get("content", {})
                .get("parts", [{}])[0]
                .get("text", "⚠️ Não consegui gerar resposta")
        )

        return jsonify({
            'response': bot_response,
            'timestamp': datetime.now().isoformat(),
            'status': 'success'
        })

    except Exception as e:
        print(f"Erro no chat: {e}")
        return jsonify({
            'error': 'Desculpe, estou com dificuldades técnicas. Tente novamente!',
            'status': 'error'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'OK',
        'service': 'DNC Chat API - Daniel Eloy',
        'projects': 10,
        'timestamp': datetime.now().isoformat()
    })

# ---- Rodar o servidor ----
if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug_mode = os.getenv('FLASK_ENV', 'development') == 'development'
    print(f"🚀 Servidor do chat DNC rodando na porta {port}")
    print(f"📊 Especializado nos 10 projetos do Daniel Eloy")
    app.run(debug=debug_mode, host='0.0.0.0', port=port)
