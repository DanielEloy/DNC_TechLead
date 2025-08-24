import http.server
import socketserver
import os
import json
import sys
import shutil
from datetime import datetime
from urllib.parse import unquote

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
CONFIG_FILE = os.path.join(BASE_DIR, "config_certificados.json")

data_atual = datetime.now().strftime('%d/%m/%Y %H:%M')

# Verificar se a pasta public existe
if not os.path.exists(PUBLIC_DIR):
    print(f"❌ Erro: A pasta '{PUBLIC_DIR}' não existe!")
    exit(1)

# Carregar ou criar configuração dos certificados
def carregar_configuracao():
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            # Se o arquivo estiver corrompido, criar um novo
            return {}
    
    # Se não existe, criar configuração padrão
    config = {
        "Fundamentos de Javascript.pdf": {
            "importancia": 1,
            "data_conclusao": "01/01/2023"
        },
        "Introdução ao Desenvolvimento Web.pdf": {
            "importancia": 2,
            "data_conclusao": "01/01/2023"
        },
        "Responsividade CSS com Media Queries.pdf": {
            "importancia": 3,
            "data_conclusao": "01/01/2023"
        },
        "_ultima_atualizacao": datetime.now().strftime('%d/%m/%Y %H:%M')
    }
    
    # Salvar configuração
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        json.dump(config, f, ensure_ascii=False, indent=2)
    
    return config

def salvar_configuracao(config):
    """Salva a configuração atualizada no arquivo JSON"""
    config["_ultima_atualizacao"] = datetime.now().strftime('%d/%m/%Y %H:%M')
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        json.dump(config, f, ensure_ascii=False, indent=2)

# Carregar configuração
config = carregar_configuracao()

def tamanho_para_humano(bytes):
    """Converte bytes para formato humano (KB, MB, etc.)"""
    if bytes == 0:
        return "0 B"
    sizes = ["B", "KB", "MB", "GB"]
    i = 0
    while bytes >= 1024 and i < len(sizes) - 1:
        bytes /= 1024.0
        i += 1
    return f"{bytes:.1f} {sizes[i]}"

def atualizar_configuracao_com_novos_certificados():
    """Atualiza a configuração com novos certificados que possam ter sido adicionados"""
    global config
    atualizado = False
    
    # Listar arquivos PDF na pasta public
    arquivos = os.listdir(PUBLIC_DIR)
    for arquivo in arquivos:
        if arquivo.lower().endswith('.pdf') and arquivo not in config and not arquivo.startswith('.'):
            # Adicionar novo certificado à configuração
            stats = os.stat(os.path.join(PUBLIC_DIR, arquivo))
            data_modificacao = datetime.fromtimestamp(stats.st_mtime).strftime('%d/%m/%Y')
            
            config[arquivo] = {
                "importancia": 3,  # Importância padrão (baixa)
                "data_conclusao": datetime.now().strftime('%d/%m/%Y %H:%M') #data_modificacao #Data da última modificação
            }
            atualizado = True
            print(f"✅ Novo certificado adicionado à configuração: {arquivo}")
    
    # Remover certificados que não existem mais
    for certificado in list(config.keys()):
        if certificado.startswith('_'):  # Manter metadados
            continue
            
        if not os.path.exists(os.path.join(PUBLIC_DIR, certificado)):
            del config[certificado]
            atualizado = True
            print(f"❌ Certificado removido da configuração: {certificado}")
    
    if atualizado:
        salvar_configuracao(config)
    
    return atualizado

def obter_info_certificado(nome_arquivo):
    """Obtém informações do certificado a partir da configuração"""
    if nome_arquivo in config:
        return config[nome_arquivo]
    
    # Se não existe na configuração, adicionar
    stats = os.stat(os.path.join(PUBLIC_DIR, nome_arquivo))
    data_modificacao = datetime.fromtimestamp(stats.st_mtime).strftime('%d/%m/%Y')
    
    nova_config = {
        "importancia": 999,
        "data_conclusao": data_modificacao
    }
    
    config[nome_arquivo] = nova_config
    salvar_configuracao(config)
    
    return nova_config

def gerar_lista_certificados():
    try:
        # Atualizar configuração com novos certificados
        atualizar_configuracao_com_novos_certificados()
        
        arquivos = os.listdir(PUBLIC_DIR)
        certificados = []
        
        for arquivo in arquivos:
            if arquivo.startswith('.') or arquivo in ['style.css', 'index.html']:
                continue
                
            caminho_completo = os.path.join(PUBLIC_DIR, arquivo)
            if os.path.isfile(caminho_completo) and arquivo.lower().endswith('.pdf'):
                stats = os.stat(caminho_completo)
                tamanho = stats.st_size
                
                # Obter informações do certificado
                info = obter_info_certificado(arquivo)
                importancia = info["importancia"]
                data_conclusao = info["data_conclusao"]
                
                certificados.append({
                    'nome': arquivo,
                    'tamanho': tamanho,
                    'data_conclusao': data_conclusao,
                    'importancia': importancia
                })
        
        # Ordenar por importância
        certificados.sort(key=lambda x: x['importancia'])
        
        html_certificados = ""
        for cert in certificados:
            classe_importancia = f"prioridade-{cert['importancia']}" if cert['importancia'] <= 3 else ""
                
            html_certificados += f"""
            <li class="item-arquivo {classe_importancia}">
              <a href="{cert['nome']}" class="nome-arquivo" target="_blank">{cert['nome']}</a>
              <div class="info-arquivo">
                Concluído em: {cert['data_conclusao']} | {tamanho_para_humano(cert['tamanho'])}
                
              </div>
            </li>
            """
        return html_certificados
        
    except Exception as e:
        print(f"Erro ao gerar lista de certificados: {e}")
        return "<li>Erro ao carregar certificados</li>"

def gerar_site_estatico():
    """Gera uma versão estática do site para deploy no Netlify"""
    # Criar diretório de build se não existir
    build_dir = os.path.join(BASE_DIR, "build")
    if not os.path.exists(build_dir):
        os.makedirs(build_dir)
    
    # Copiar arquivos estáticos
    if os.path.exists(PUBLIC_DIR):
        for item in os.listdir(PUBLIC_DIR):
            src = os.path.join(PUBLIC_DIR, item)
            dst = os.path.join(build_dir, item)
            if os.path.isfile(src):
                shutil.copy2(src, dst)
    
    # Gerar HTML estático
    try:
        index_path = os.path.join(BASE_DIR, "index.html")
        with open(index_path, 'r', encoding='utf-8') as f:
            html_base = f.read()
        
        html_certificados = gerar_lista_certificados()
        html_final = html_base.replace("<!--CERTIFICADOS-->", html_certificados)
        html_final = html_final.replace("<!--data-atual-->", datetime.now().strftime('%d/%m/%Y %H:%M'))
        
        # Salvar index.html no diretório de build
        with open(os.path.join(build_dir, "index.html"), 'w', encoding='utf-8') as f:
            f.write(html_final)
        
        # Copiar CSS para o diretório de build
        css_src = os.path.join(BASE_DIR, "style.css")
        css_dst = os.path.join(build_dir, "style.css")
        if os.path.exists(css_src):
            shutil.copy2(css_src, css_dst)
        
        print(f"✅ Site estático gerado em: {build_dir}")
        return True
    except Exception as e:
        print(f"❌ Erro ao gerar site estático: {e}")
        return False

class CertificadoHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PUBLIC_DIR, **kwargs)
    
    def do_GET(self):
        requested_path = unquote(self.path.lstrip('/'))
        public_file_path = os.path.join(PUBLIC_DIR, requested_path)
        
        # Servir arquivos estáticos
        if self.path != '/' and os.path.exists(public_file_path) and os.path.isfile(public_file_path):
            super().do_GET()
            return

        # Servir CSS do diretório base
        if self.path == '/style.css':
            css_path = os.path.join(BASE_DIR, 'style.css')
            if os.path.exists(css_path):
                try:
                    with open(css_path, 'rb') as f:
                        css_content = f.read()
                    
                    self.send_response(200)
                    self.send_header('Content-type', 'text/css')
                    self.send_header('Content-Length', str(len(css_content)))
                    self.end_headers()
                    self.wfile.write(css_content)
                    return
                except Exception as e:
                    print(f"Erro ao servir CSS: {e}")
        
        # Servir página principal
        if self.path == '/' or self.path == '/index.html':
            try:
                index_path = os.path.join(BASE_DIR, 'index.html')
                if os.path.exists(index_path):
                    with open(index_path, 'r', encoding='utf-8') as f:
                        html_base = f.read()
                    
                    html_certificados = gerar_lista_certificados()
                    html_final = html_base.replace("<!--CERTIFICADOS-->", html_certificados)
                    html_final = html_final.replace("<!--data-atual-->", datetime.now().strftime('%d/%m/%Y %H:%M'))
                    
                    self.send_response(200)
                    self.send_header('Content-type', 'text/html; charset=utf-8')
                    self.end_headers()
                    self.wfile.write(html_final.encode('utf-8'))
                    return
                else:
                    self.send_error(404, "Arquivo index.html não encontrado")
                    return
            except Exception as e:
                self.send_error(500, f"Erro interno do servidor: {str(e)}")
                return

        self.send_error(404, "Arquivo não encontrado")

if __name__ == "__main__":
    # Verificar se é para gerar versão estática (para Netlify)
    if "--build-static" in sys.argv:
        print("Gerando versão estática para Netlify...")
        sucesso = gerar_site_estatico()
        sys.exit(0 if sucesso else 1)
    
    # Iniciar servidor de desenvolvimento
    with socketserver.TCPServer(("127.0.0.1", PORT), CertificadoHandler) as httpd:
        print(f"✅ Servidor rodando na porta {PORT}")
        print(f"🌐 Acesse: http://127.0.0.1:{PORT}")
        print("📁 Diretório base:", BASE_DIR)
        print("📁 Diretório público:", PUBLIC_DIR)
        print("📋 Arquivo de configuração:", CONFIG_FILE)
        print("🚀 Para parar o servidor, pressione Ctrl+C")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Servidor encerrado")