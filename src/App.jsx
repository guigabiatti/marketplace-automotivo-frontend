import { useState, useEffect } from 'react'
import AdminDashboard from './components/admin/AdminDashboard'

// Configuração da API baseada no ambiente
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Componente de Comparação Visual - Estilo Kimovil ATUALIZADO
const TabelaComparacao = ({ veiculos, onFechar }) => {
  if (veiculos.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      zIndex: 9999,
      padding: '20px',
      overflow: 'auto',
      backdropFilter: 'blur(3px)'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '30px',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
        transform: 'scale(1)',
        transition: 'all 0.3s ease-in-out'
      }}>
        {/* Header da Comparação */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '20px'
        }}>
          <h2 style={{ 
            color: '#1e293b', 
            margin: 0,
            fontSize: '28px',
            fontWeight: 'bold'
          }}>
            ⚖️ Comparação Detalhada - Estilo Kimovil
          </h2>
          <button 
            onClick={onFechar}
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)'
            }}
          >
            ❌ Fechar
          </button>
        </div>

        {/* Tabela de Comparação */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            {/* Cabeçalho com Imagens dos Carros */}
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th style={{ 
                  padding: '20px', 
                  textAlign: 'left',
                  fontWeight: 'bold',
                  color: '#374151',
                  fontSize: '16px',
                  borderBottom: '2px solid #e2e8f0'
                }}>
                  Características
                </th>
                {veiculos.map((veiculo, index) => (
                  <th key={index} style={{ 
                    padding: '20px', 
                    textAlign: 'center',
                    borderBottom: '2px solid #e2e8f0',
                    backgroundColor: index % 2 === 0 ? '#f0f9ff' : '#f0fdf4'
                  }}>
                    <div style={{
                      backgroundColor: 'white',
                      padding: '15px',
                      borderRadius: '10px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        color: '#1e293b',
                        marginBottom: '5px'
                      }}>
                        🚗 {veiculo.marca}
                      </div>
                      <div style={{ 
                        fontSize: '16px', 
                        color: '#6b7280',
                        marginBottom: '10px'
                      }}>
                        {veiculo.modelo}
                      </div>
                      <div style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#059669'
                      }}>
                        R$ {veiculo.preco_fipe?.toLocaleString()}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Corpo da Tabela */}
            <tbody>
              {/* Informações Básicas */}
              <tr style={{ backgroundColor: '#fafafa' }}>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#374151' }}>
                  📅 Ano
                </td>
                {veiculos.map((veiculo, index) => (
                  <td key={index} style={{ 
                    padding: '15px', 
                    textAlign: 'center',
                    fontSize: '16px',
                    color: '#1e293b'
                  }}>
                    {veiculo.ano}
                  </td>
                ))}
              </tr>

              <tr>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#374151' }}>
                  ⚙️ Versão
                </td>
                {veiculos.map((veiculo, index) => (
                  <td key={index} style={{ 
                    padding: '15px', 
                    textAlign: 'center',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    {veiculo.versao}
                  </td>
                ))}
              </tr>

              <tr style={{ backgroundColor: '#fafafa' }}>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#374151' }}>
                  ⛽ Combustível
                </td>
                {veiculos.map((veiculo, index) => (
                  <td key={index} style={{ 
                    padding: '15px', 
                    textAlign: 'center',
                    fontSize: '16px',
                    color: '#1e293b'
                  }}>
                    {veiculo.combustivel}
                  </td>
                ))}
              </tr>

              {/* Performance */}
              <tr>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#374151' }}>
                  🏙️ Consumo Cidade (km/l)
                </td>
                {veiculos.map((veiculo, index) => {
                  const melhorConsumo = Math.max(...veiculos.map(v => v.consumo_cidade));
                  const isMelhor = veiculo.consumo_cidade === melhorConsumo;
                  return (
                    <td key={index} style={{ 
                      padding: '15px', 
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: isMelhor ? 'bold' : 'normal',
                      color: isMelhor ? '#059669' : '#1e293b',
                      backgroundColor: isMelhor ? '#f0fdf4' : 'transparent'
                    }}>
                      {veiculo.consumo_cidade} {isMelhor && '🏆'}
                    </td>
                  );
                })}
              </tr>

              <tr style={{ backgroundColor: '#fafafa' }}>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#374151' }}>
                  🛣️ Consumo Estrada (km/l)
                </td>
                {veiculos.map((veiculo, index) => {
                  const melhorConsumo = Math.max(...veiculos.map(v => v.consumo_estrada));
                  const isMelhor = veiculo.consumo_estrada === melhorConsumo;
                  return (
                    <td key={index} style={{ 
                      padding: '15px', 
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: isMelhor ? 'bold' : 'normal',
                      color: isMelhor ? '#059669' : '#1e293b',
                      backgroundColor: isMelhor ? '#f0fdf4' : 'transparent'
                    }}>
                      {veiculo.consumo_estrada} {isMelhor && '🏆'}
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#374151' }}>
                  🧳 Porta-malas (L)
                </td>
                {veiculos.map((veiculo, index) => {
                  const maiorPortaMalas = Math.max(...veiculos.map(v => v.porta_malas));
                  const isMaior = veiculo.porta_malas === maiorPortaMalas;
                  return (
                    <td key={index} style={{ 
                      padding: '15px', 
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: isMaior ? 'bold' : 'normal',
                      color: isMaior ? '#059669' : '#1e293b',
                      backgroundColor: isMaior ? '#f0fdf4' : 'transparent'
                    }}>
                      {veiculo.porta_malas} {isMaior && '🏆'}
                    </td>
                  );
                })}
              </tr>

              {/* Scores de IA */}
              <tr style={{ backgroundColor: '#f0f9ff', borderTop: '3px solid #3b82f6' }}>
                <td style={{ 
                  padding: '20px', 
                  fontWeight: 'bold', 
                  color: '#1e40af',
                  fontSize: '18px'
                }}>
                  🤖 SCORES DE IA
                </td>
                {veiculos.map((veiculo, index) => (
                  <td key={index} style={{ 
                    padding: '20px', 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#1e40af'
                  }}>
                    INTELIGÊNCIA ARTIFICIAL
                  </td>
                ))}
              </tr>

              <tr>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#374151' }}>
                  💰 Score Economia
                </td>
                {veiculos.map((veiculo, index) => {
                  const melhorScore = Math.max(...veiculos.map(v => v.score_economia));
                  const isMelhor = veiculo.score_economia === melhorScore;
                  return (
                    <td key={index} style={{ 
                      padding: '15px', 
                      textAlign: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: isMelhor ? '#059669' : '#1e40af',
                      backgroundColor: isMelhor ? '#f0fdf4' : '#dbeafe'
                    }}>
                      {veiculo.score_economia?.toFixed(1)} {isMelhor && '🏆'}
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#374151' }}>
                  👨‍👩‍👧‍👦 Score Família
                </td>
                {veiculos.map((veiculo, index) => {
                  const melhorScore = Math.max(...veiculos.map(v => v.score_familia));
                  const isMelhor = veiculo.score_familia === melhorScore;
                  return (
                    <td key={index} style={{ 
                      padding: '15px', 
                      textAlign: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: isMelhor ? '#059669' : '#15803d',
                      backgroundColor: isMelhor ? '#f0fdf4' : '#dcfce7'
                    }}>
                      {veiculo.score_familia?.toFixed(1)} {isMelhor && '🏆'}
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#374151' }}>
                  🏎️ Score Esportivo
                </td>
                {veiculos.map((veiculo, index) => {
                  const melhorScore = Math.max(...veiculos.map(v => v.score_esportivo));
                  const isMelhor = veiculo.score_esportivo === melhorScore;
                  return (
                    <td key={index} style={{ 
                      padding: '15px', 
                      textAlign: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: isMelhor ? '#059669' : '#dc2626',
                      backgroundColor: isMelhor ? '#f0fdf4' : '#fee2e2'
                    }}>
                      {veiculo.score_esportivo?.toFixed(1)} {isMelhor && '🏆'}
                    </td>
                  );
                })}
              </tr>

              {/* Score Geral */}
              <tr style={{ backgroundColor: '#fef3c7', borderTop: '3px solid #f59e0b' }}>
                <td style={{ 
                  padding: '20px', 
                  fontWeight: 'bold', 
                  color: '#92400e',
                  fontSize: '18px'
                }}>
                  🏆 SCORE GERAL (IA)
                </td>
                {veiculos.map((veiculo, index) => {
                  const scoreGeral = (veiculo.score_economia + veiculo.score_familia + veiculo.score_esportivo) / 3;
                  const melhorGeral = Math.max(...veiculos.map(v => (v.score_economia + v.score_familia + v.score_esportivo) / 3));
                  const isMelhor = scoreGeral === melhorGeral;
                  return (
                    <td key={index} style={{ 
                      padding: '20px', 
                      textAlign: 'center',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: isMelhor ? '#059669' : '#92400e',
                      backgroundColor: isMelhor ? '#f0fdf4' : 'transparent'
                    }}>
                      {scoreGeral.toFixed(1)} {isMelhor && '👑'}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recomendação da IA */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f0f9ff',
          borderRadius: '10px',
          border: '2px solid #3b82f6'
        }}>
          <h3 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>
            🤖 Recomendação da IA
          </h3>
          <p style={{ color: '#374151', margin: 0, fontSize: '16px' }}>
            {(() => {
              const melhorVeiculo = veiculos.reduce((prev, curr) => {
                const scorePrev = (prev.score_economia + prev.score_familia + prev.score_esportivo) / 3;
                const scoreCurr = (curr.score_economia + curr.score_familia + curr.score_esportivo) / 3;
                return scorePrev > scoreCurr ? prev : curr;
              });
              return `🏆 Baseado na análise comparativa, o ${melhorVeiculo.marca} ${melhorVeiculo.modelo} oferece o melhor equilíbrio geral entre economia, família e performance, com score geral de ${((melhorVeiculo.score_economia + melhorVeiculo.score_familia + melhorVeiculo.score_esportivo) / 3).toFixed(1)}.`;
            })()}
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [veiculos, setVeiculos] = useState([])
  const [loading, setLoading] = useState(false)
  const [criterio, setCriterio] = useState('trabalho')
  const [orcamento, setOrcamento] = useState(100000)
  const [veiculosComparacao, setVeiculosComparacao] = useState([])
  const [mostrarComparacao, setMostrarComparacao] = useState(false)
  const [modoAdmin, setModoAdmin] = useState(false)

  // Função para fazer requisições com tratamento de erro
  const fetchAPI = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erro na API ${endpoint}:`, error);
      throw error;
    }
  };

  // Buscar veículos do backend
  const buscarVeiculos = async () => {
    setLoading(true)
    try {
      const data = await fetchAPI('/api/veiculos');
      setVeiculos(data.veiculos || [])
      console.log('Dados recebidos:', data)
    } catch (error) {
      console.error('Erro ao buscar veículos:', error)
      // Fallback para dados offline se necessário
      setVeiculos([])
    }
    setLoading(false)
  }

  // Buscar com IA Avançada
  const buscarComIA = async () => {
    setLoading(true)
    try {
      const data = await fetchAPI('/api/recomendar-avancado', {
        method: 'POST',
        body: JSON.stringify({ 
          uso: criterio, 
          orcamento: orcamento 
        })
      });
      setVeiculos(data.recomendacoes || [])
      console.log('Recomendações IA:', data)
    } catch (error) {
      console.error('Erro ao buscar com IA:', error)
      setVeiculos([])
    }
    setLoading(false)
  }

  // Adicionar à comparação
  const adicionarComparacao = (veiculo) => {
    if (veiculosComparacao.length < 3 && !veiculosComparacao.find(v => v._id === veiculo._id)) {
      setVeiculosComparacao([...veiculosComparacao, veiculo])
    }
  }

  // Remover da comparação
  const removerComparacao = (veiculoId) => {
    setVeiculosComparacao(veiculosComparacao.filter(v => v._id !== veiculoId))
  }

  // Abrir comparação
  const abrirComparacao = () => {
    if (veiculosComparacao.length >= 2) {
      setMostrarComparacao(true);
    }
  };

  // Fechar comparação
  const fecharComparacao = () => {
    setMostrarComparacao(false);
  };

  useEffect(() => {
    buscarVeiculos()
  }, [])

  // Se modo admin estiver ativo, mostrar apenas o dashboard
  if (modoAdmin) {
    return (
      <div>
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          backgroundColor: '#1e293b',
          color: 'white'
        }}>
          <button 
            onClick={() => setModoAdmin(false)}
            style={{ 
              backgroundColor: '#ef4444', 
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            👤 Voltar ao Modo Usuário
          </button>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '1200px', 
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      {/* Header Moderno */}
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        borderRadius: '20px',
        color: 'white',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          margin: '0',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          🚗 Marketplace Automotivo
        </h1>
        <p style={{ 
          fontSize: '20px', 
          margin: '10px 0 0 0',
          opacity: '0.9'
        }}>
          O primeiro marketplace brasileiro com IA integrada
        </p>
      </header>

      {/* Busca Inteligente com IA */}
      <div style={{ 
        backgroundColor: '#f1f5f9', 
        padding: '25px', 
        borderRadius: '15px', 
        marginBottom: '30px',
        border: '2px solid #e2e8f0',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ 
          color: '#1e293b', 
          marginBottom: '20px', 
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          🤖 Busca Inteligente com IA
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          gap: '20px',
          alignItems: 'end'
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold',
              color: '#374151'
            }}>
              🎯 Uso Principal:
            </label>
            <select 
              value={criterio}
              onChange={(e) => setCriterio(e.target.value)}
              style={{ 
                width: '100%',
                padding: '12px', 
                borderRadius: '8px', 
                border: '2px solid #cbd5e1',
                fontSize: '16px',
                backgroundColor: 'white'
              }}
            >
              <option value="trabalho">💼 Para trabalho</option>
              <option value="familia">👨‍👩‍👧‍👦 Para família</option>
              <option value="lazer">🏖️ Para lazer</option>
              <option value="geral">⭐ Melhor geral</option>
            </select>
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold',
              color: '#374151'
            }}>
              💰 Orçamento: R$ {orcamento.toLocaleString()}
            </label>
            <input 
              type="range" 
              min="50000" 
              max="200000"
              step="5000"
              value={orcamento}
              onChange={(e) => setOrcamento(Number(e.target.value))}
              style={{ 
                width: '100%',
                height: '40px',
                cursor: 'pointer'
              }}
            />
          </div>
          
          <button 
            onClick={buscarComIA}
            disabled={loading}
            style={{ 
              backgroundColor: '#8b5cf6', 
              color: 'white', 
              padding: '12px 20px', 
              border: 'none', 
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? '🔄 Buscando...' : '🔍 Buscar com IA'}
          </button>
        </div>
      </div>

      {/* Botões de Ação */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={buscarVeiculos}
          disabled={loading}
          style={{ 
            backgroundColor: '#4f46e5', 
            color: 'white', 
            padding: '15px 30px', 
            border: 'none', 
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? '🔄 Carregando...' : '🚀 Todos os Veículos'}
        </button>

        {/* Botão Admin */}
        <button 
          onClick={() => setModoAdmin(true)}
          style={{ 
            backgroundColor: '#8b5cf6', 
            color: 'white', 
            padding: '15px 30px', 
            border: 'none', 
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
          }}
        >
          👨‍💼 Modo Admin
        </button>

        {veiculosComparacao.length > 0 && (
          <button 
            onClick={abrirComparacao}
            disabled={veiculosComparacao.length < 2}
            style={{ 
              backgroundColor: veiculosComparacao.length >= 2 ? '#f59e0b' : '#9ca3af', 
              color: 'white', 
              padding: '15px 30px', 
              border: 'none', 
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: veiculosComparacao.length >= 2 ? 'pointer' : 'not-allowed',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
            }}
          >
            ⚖️ {veiculosComparacao.length >= 2 ? `Comparar (${veiculosComparacao.length})` : `Selecione ${2 - veiculosComparacao.length} mais`}
          </button>
        )}
      </div>

      {/* Status */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#1e293b', margin: '0 0 10px 0' }}>
          📊 Status da Conexão
        </h2>
        <p style={{ color: '#6b7280', margin: '0' }}>
          {loading ? 'Carregando dados...' : `${veiculos.length} veículos encontrados`}
        </p>
        {veiculosComparacao.length > 0 && (
          <p style={{ color: '#f59e0b', margin: '5px 0 0 0', fontWeight: 'bold' }}>
            {veiculosComparacao.length} veículo(s) selecionado(s) para comparação
          </p>
        )}
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0 0 0' }}>
          Conectado a: {API_BASE}
        </p>
      </div>

      {/* Resultados */}
      {loading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px',
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            fontSize: '24px', 
            color: '#6b7280',
            animation: 'pulse 2s infinite'
          }}>
            🔄 Carregando dados do backend...
          </div>
        </div>
      ) : veiculos.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px',
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '24px', color: '#ef4444', marginBottom: '10px' }}>
            ⚠️ Nenhum veículo encontrado
          </div>
          <p style={{ color: '#6b7280' }}>
            Verifique se o backend está rodando em {API_BASE}
          </p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '25px' 
        }}>
          {veiculos.map((veiculo, index) => (
            <div key={index} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              boxShadow: veiculosComparacao.find(v => v._id === veiculo._id) 
                ? '0 8px 25px rgba(245, 158, 11, 0.3)' 
                : '0 8px 25px rgba(0,0,0,0.1)',
              border: veiculosComparacao.find(v => v._id === veiculo._id) 
                ? '3px solid #f59e0b' 
                : '1px solid #e2e8f0',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}>
              <h3 style={{ 
                color: '#1e293b', 
                margin: '0 0 15px 0', 
                fontSize: '22px',
                fontWeight: 'bold'
              }}>
                🚗 {veiculo.marca} {veiculo.modelo}
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '8px 0', color: '#6b7280', fontSize: '16px' }}>
                  <strong>📅 Ano:</strong> {veiculo.ano} | <strong>⚙️ Versão:</strong> {veiculo.versao}
                </p>
                <p style={{ margin: '8px 0', color: '#6b7280', fontSize: '16px' }}>
                  <strong>⛽ Combustível:</strong> {veiculo.combustivel}
                </p>
                <p style={{ margin: '8px 0', color: '#6b7280', fontSize: '16px' }}>
                  <strong>🏙️ Consumo:</strong> {veiculo.consumo_cidade} km/l (cidade)
                </p>
                <p style={{ margin: '8px 0', color: '#6b7280', fontSize: '16px' }}>
                  <strong>🧳 Porta-malas:</strong> {veiculo.porta_malas}L
                </p>
              </div>

              <div style={{ 
                fontSize: '28px', 
                fontWeight: 'bold', 
                color: '#059669', 
                marginBottom: '20px',
                textAlign: 'center',
                padding: '10px',
                backgroundColor: '#f0fdf4',
                borderRadius: '10px'
              }}>
                💰 R$ {veiculo.preco_fipe?.toLocaleString() || 'N/A'}
              </div>

              {/* Scores de IA */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 1fr', 
                gap: '10px',
                marginBottom: '15px'
              }}>
                <div style={{ 
                  textAlign: 'center', 
                  padding: '12px', 
                  backgroundColor: '#dbeafe', 
                  borderRadius: '8px',
                  border: '2px solid #3b82f6'
                }}>
                  <div style={{ fontSize: '12px', color: '#1e40af', fontWeight: 'bold' }}>
                    💰 ECONOMIA
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e40af' }}>
                    {veiculo.score_economia?.toFixed(1) || 'N/A'}
                  </div>
                </div>
                <div style={{ 
                  textAlign: 'center', 
                  padding: '12px', 
                  backgroundColor: '#dcfce7', 
                  borderRadius: '8px',
                  border: '2px solid #22c55e'
                }}>
                  <div style={{ fontSize: '12px', color: '#15803d', fontWeight: 'bold' }}>
                    👨‍👩‍👧‍👦 FAMÍLIA
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#15803d' }}>
                    {veiculo.score_familia?.toFixed(1) || 'N/A'}
                  </div>
                </div>
                <div style={{ 
                  textAlign: 'center', 
                  padding: '12px', 
                  backgroundColor: '#fee2e2', 
                  borderRadius: '8px',
                  border: '2px solid #ef4444'
                }}>
                  <div style={{ fontSize: '12px', color: '#dc2626', fontWeight: 'bold' }}>
                    🏎️ ESPORTIVO
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc2626' }}>
                    {veiculo.score_esportivo?.toFixed(1) || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Botão de Comparação */}
              <div style={{ textAlign: 'center' }}>
                {veiculosComparacao.find(v => v._id === veiculo._id) ? (
                  <button 
                    onClick={() => removerComparacao(veiculo._id)}
                    style={{ 
                      backgroundColor: '#ef4444', 
                      color: 'white', 
                      padding: '10px 20px', 
                      border: 'none', 
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ❌ Remover Comparação
                  </button>
                ) : (
                  <button 
                    onClick={() => adicionarComparacao(veiculo)}
                    disabled={veiculosComparacao.length >= 3}
                    style={{ 
                      backgroundColor: veiculosComparacao.length >= 3 ? '#9ca3af' : '#f59e0b', 
                      color: 'white', 
                      padding: '10px 20px', 
                      border: 'none', 
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: veiculosComparacao.length >= 3 ? 'not-allowed' : 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ⚖️ {veiculosComparacao.length >= 3 ? 'Máx. 3 veículos' : 'Adicionar Comparação'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        marginTop: '50px', 
        padding: '30px',
        backgroundColor: '#1e293b',
        color: 'white',
        borderRadius: '15px'
      }}>
        <p style={{ margin: '0', fontSize: '18px' }}>
          🚀 Marketplace Automotivo - Powered by IA | Desenvolvido por Guilherme
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: '0.7' }}>
          Ambiente: {import.meta.env.MODE} | API: {API_BASE}
        </p>
      </footer>

      {/* Tabela de Comparação - Modal */}
      {mostrarComparacao && (
        <TabelaComparacao 
          veiculos={veiculosComparacao} 
          onFechar={fecharComparacao}
        />
      )}
    </div>
  )
}

export default App
