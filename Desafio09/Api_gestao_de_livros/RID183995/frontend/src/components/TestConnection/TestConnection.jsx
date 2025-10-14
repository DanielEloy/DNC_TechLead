import { LivrosService } from '../../api/LivrosService.js';

function TestConnection() {
  const testAPI = async () => {
    try {
      const response = await LivrosService.getLivros();
      console.log('✅ Conexão OK - Livros:', response.data);
      alert(`✅ Conexão OK! ${response.data.length} livros encontrados.`);
    } catch (error) {
      console.error('❌ Erro na conexão:', error);
      alert('❌ Erro na conexão: ' + error.message);
    }
  };

  return (
    <button onClick={testAPI} style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#ff4444',
      color: 'white',
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      zIndex: 1000
    }}>
      Testar Conexão API
    </button>
  );
}

export default TestConnection;