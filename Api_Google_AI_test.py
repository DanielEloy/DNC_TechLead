import os
from dotenv import load_dotenv
import requests
import json

# Carrega as variáveis do arquivo .env
load_dotenv()

# Configurações da API - CORRIGIDO
API_KEY = os.getenv("GEMINI_API_KEY") 
BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"


# Verificação de configuração
if not API_KEY:
    print("❌ ERRO: GEMINI_API_KEY não encontrada no arquivo .env")
    print("💡 Dica: Verifique se o arquivo .env existe e tem a chave")
    exit()

print("✅ Configuração carregada com sucesso!")
print(f"🔑 Chave API: {API_KEY[:10]}...")  # Mostra apenas os primeiros caracteres

# Headers da requisição
headers = {
    "Content-Type": "application/json",
}

# Corpo da requisição (está correto!)
payload = {
    "contents": [
        {
            "parts": [
                {"text": "Explique o que é programação orientada a objetos em Python."}
            ]
        }
    ]
}

try:
    # URL CORRETA - chave como parâmetro
    full_url = f"{BASE_URL}?key={API_KEY}"
    response = requests.post(full_url, headers=headers, json=payload)
    response.raise_for_status()
    
    # Processar a resposta
    data = response.json()
    resposta = data["candidates"][0]["content"]["parts"][0]["text"]
    print("Resposta do Gemini:")
    print(resposta)
    
except requests.exceptions.RequestException as e:
    print(f"Erro na requisição: {e}")
    if hasattr(e, 'response') and e.response:
        print(f"Detalhes do erro: {e.response.text}")