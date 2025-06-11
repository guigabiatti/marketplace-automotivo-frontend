import { useState, useEffect } from 'react'

const AdminDashboard = () => {
  const [stats, setStats] = useState({})
  const [veiculos, setVeiculos] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Buscar estatísticas do backend
  const buscarEstatisticas = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/estatisticas')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    }
    setLoading(false)
  }

  // Buscar todos os veículos
  const buscarVeiculos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/veiculos')
      const data = await response.json()
      setVeiculos(data.veiculos || [])
    } catch (error) {
      console.error('Erro ao buscar veículos:', error)
    }
  }

  // Executar scraping da FIPE
  const executarScrapingFipe = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/atualizar-fipe-real')
      const data = await response.json()
      alert(`Scraping concluído! ${data.coletados} veículos coletados da FIPE`)
      buscarEstatisticas()
      buscarVeiculos()
    } catch (error) {
      console.error('Erro no scraping:', error)
      alert('Erro ao executar scraping da FIPE')
    }
    setLoading(false)
  }

  // Deletar veículo
  const deletarVeiculo = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este veículo?')) {
      try {
        await fetch(`http://localhost:5000/api/veiculos/${id}`, { method: 'DELETE' })
        alert('Veículo deletado com sucesso!')
        buscarVeiculos()
        buscarEstatisticas()
      } catch (error) {
        console.error('Erro ao deletar:', error)
        alert('Erro ao deletar veículo')
      }
    }
  }

  useEffect(() => {
    buscarEstatisticas()
    buscarVeiculos()
  }, [])

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      {/* Header do Dashboard */}
      <header style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        padding: '30px',
        borderRadius: '15px',
        color: 'white',
        marginBottom: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ margin: '0', fontSize: '36px', fontWeight: 'bold' }}>
          👨‍💼 Dashboard Administrativo
        </h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: '0.9' }}>
          Painel de controle completo do Marketplace Automotivo
        </p>
      </header>

      {/* Navegação por Abas */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { id: 'overview', label: '📊 Visão Geral' },
            { id: 'veiculos', label: '🚗 Gestão de Veículos' },
            { id: 'scraping', label: '🕷️ Web Scraping' },
            { id: 'analytics', label: '📈 Analytics' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 20px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: activeTab === tab.id ? '#3b82f6' : '#e2e8f0',
                color: activeTab === tab.id ? 'white' : '#374151',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo das Abas */}
      {activeTab === 'overview' && (
        <div>
          {/* Cards de Estatísticas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              border: '2px solid #3b82f6'
            }}>
              <h3 style={{ color: '#3b82f6', margin: '0 0 10px 0', fontSize: '18px' }}>
                🚗 Total de Veículos
              </h3>
              <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', margin: '0' }}>
                {stats.total_veiculos || 0}
              </p>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              border: '2px solid #059669'
            }}>
              <h3 style={{ color: '#059669', margin: '0 0 10px 0', fontSize: '18px' }}>
                🕷️ Dados da FIPE
              </h3>
              <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', margin: '0' }}>
                {stats.fontes?.fipe_real || 0}
              </p>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              border: '2px solid #f59e0b'
            }}>
              <h3 style={{ color: '#f59e0b', margin: '0 0 10px 0', fontSize: '18px' }}>
                🏭 Marcas Disponíveis
              </h3>
              <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', margin: '0' }}>
                {stats.marcas || 0}
              </p>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              border: '2px solid #8b5cf6'
            }}>
              <h3 style={{ color: '#8b5cf6', margin: '0 0 10px 0', fontSize: '18px' }}>
                💰 Preço Médio
              </h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: '0' }}>
                R$ {(stats.preco_medio || 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Marcas Disponíveis */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <h3 style={{ color: '#1e293b', margin: '0 0 20px 0' }}>
              🏭 Marcas no Sistema
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {(stats.marcas_disponiveis || []).map((marca, index) => (
                <span key={index} style={{
                  backgroundColor: '#f0f9ff',
                  color: '#1e40af',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  border: '2px solid #3b82f6'
                }}>
                  {marca}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Aba de Gestão de Veículos */}
      {activeTab === 'veiculos' && (
        <div>
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e293b', margin: '0 0 20px 0' }}>
              🚗 Gestão de Veículos ({veiculos.length})
            </h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: 'white'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Marca</th>
                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Modelo</th>
                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Ano</th>
                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Preço</th>
                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Fonte</th>
                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {veiculos.map((veiculo, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '15px' }}>{veiculo.marca}</td>
                      <td style={{ padding: '15px' }}>{veiculo.modelo}</td>
                      <td style={{ padding: '15px' }}>{veiculo.ano}</td>
                      <td style={{ padding: '15px' }}>R$ {veiculo.preco_fipe?.toLocaleString()}</td>
                      <td style={{ padding: '15px' }}>
                        <span style={{
                          backgroundColor: veiculo.fonte === 'FIPE_API_Real' ? '#dcfce7' : '#fef3c7',
                          color: veiculo.fonte === 'FIPE_API_Real' ? '#15803d' : '#92400e',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          {veiculo.fonte === 'FIPE_API_Real' ? '🕷️ FIPE' : '📝 Manual'}
                        </span>
                      </td>
                      <td style={{ padding: '15px' }}>
                        <button
                          onClick={() => deletarVeiculo(veiculo._id)}
                          style={{
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          🗑️ Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Aba de Web Scraping */}
      {activeTab === 'scraping' && (
        <div>
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e293b', margin: '0 0 20px 0' }}>
              🕷️ Controle de Web Scraping
            </h3>
            
            <div style={{
              backgroundColor: '#f0f9ff',
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '20px',
              border: '2px solid #3b82f6'
            }}>
              <h4 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>
                📡 Coleta de Dados da FIPE
              </h4>
              <p style={{ color: '#374151', margin: '0 0 15px 0' }}>
                Execute o web scraping para coletar dados atualizados da tabela FIPE oficial.
              </p>
              <button
                onClick={executarScrapingFipe}
                disabled={loading}
                style={{
                  backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? '🔄 Executando...' : '🚀 Executar Scraping FIPE'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Aba de Analytics */}
      {activeTab === 'analytics' && (
        <div>
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e293b', margin: '0 0 20px 0' }}>
              📈 Analytics e Relatórios
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '20px',
                borderRadius: '10px',
                border: '2px solid #3b82f6'
              }}>
                <h4 style={{ color: '#1e40af', margin: '0 0 15px 0' }}>
                  📊 Distribuição por Fonte
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>🕷️ FIPE Real:</span>
                  <strong>{stats.fontes?.fipe_real || 0}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>📝 Manual:</span>
                  <strong>{stats.fontes?.manual || 0}</strong>
                </div>
              </div>

              <div style={{
                backgroundColor: '#f0fdf4',
                padding: '20px',
                borderRadius: '10px',
                border: '2px solid #22c55e'
              }}>
                <h4 style={{ color: '#15803d', margin: '0 0 15px 0' }}>
                  🏭 Top Marcas
                </h4>
                {(stats.marcas_disponiveis || []).slice(0, 5).map((marca, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '8px' 
                  }}>
                    <span>{marca}</span>
                    <strong>{veiculos.filter(v => v.marca === marca).length}</strong>
                  </div>
                ))}
              </div>

              <div style={{
                backgroundColor: '#fef3c7',
                padding: '20px',
                borderRadius: '10px',
                border: '2px solid #f59e0b'
              }}>
                <h4 style={{ color: '#92400e', margin: '0 0 15px 0' }}>
                  📅 Última Atualização
                </h4>
                <p style={{ margin: '0', color: '#374151' }}>
                  {stats.ultima_atualizacao ? 
                    new Date(stats.ultima_atualizacao).toLocaleString('pt-BR') : 
                    'Nenhuma atualização registrada'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        color: '#6b7280'
      }}>
        <p style={{ margin: '0' }}>
          👨‍💼 Dashboard Administrativo - Marketplace Automotivo | Desenvolvido por Guilherme
        </p>
      </footer>
    </div>
  )
}

export default AdminDashboard
