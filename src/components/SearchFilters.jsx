import React, { useState } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const SearchFilters = () => {
  const [filters, setFilters] = useState({
    marca: '',
    modelo: '',
    anoMin: '',
    anoMax: '',
    precoMin: '',
    precoMax: '',
    combustivel: '',
    cambio: '',
    cor: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const marcas = ['Chevrolet', 'Volkswagen', 'Fiat', 'Ford', 'Toyota', 'Honda', 'Hyundai', 'Jeep', 'Nissan', 'Renault'];
  const combustiveis = ['Flex', 'Gasolina', 'Etanol', 'Diesel', 'Híbrido', 'Elétrico'];
  const cambios = ['Manual', 'Automático', 'CVT', 'Automatizado'];
  const cores = ['Branco', 'Prata', 'Preto', 'Cinza', 'Vermelho', 'Azul', 'Verde', 'Amarelo'];

  const handleSearch = () => {
    console.log('Filtros aplicados:', filters);
    // Aqui conectaremos com o backend
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <MagnifyingGlassIcon className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">Encontre seu carro ideal</h2>
      </div>
      
      {/* Busca principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select 
          className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filters.marca}
          onChange={(e) => setFilters({...filters, marca: e.target.value})}
        >
          <option value="">Selecione a marca</option>
          {marcas.map(marca => (
            <option key={marca} value={marca}>{marca}</option>
          ))}
        </select>
        
        <input 
          type="text"
          placeholder="Modelo do veículo"
          className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filters.modelo}
          onChange={(e) => setFilters({...filters, modelo: e.target.value})}
        />
        
        <button 
          onClick={handleSearch}
          className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition-colors font-semibold"
        >
          Buscar Veículos
        </button>
      </div>
      
      {/* Toggle Filtros Avançados */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5" />
        <span className="font-semibold">
          {showAdvanced ? 'Ocultar' : 'Mostrar'} Filtros Avançados
        </span>
      </button>
      
      {/* Filtros avançados */}
      {showAdvanced && (
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ano Mínimo</label>
              <input 
                type="number" 
                placeholder="2015"
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
                value={filters.anoMin}
                onChange={(e) => setFilters({...filters, anoMin: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ano Máximo</label>
              <input 
                type="number" 
                placeholder="2025"
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
                value={filters.anoMax}
                onChange={(e) => setFilters({...filters, anoMax: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço Mínimo</label>
              <input 
                type="number" 
                placeholder="50000"
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
                value={filters.precoMin}
                onChange={(e) => setFilters({...filters, precoMin: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço Máximo</label>
              <input 
                type="number" 
                placeholder="200000"
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
                value={filters.precoMax}
                onChange={(e) => setFilters({...filters, precoMax: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Combustível</label>
              <select 
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
                value={filters.combustivel}
                onChange={(e) => setFilters({...filters, combustivel: e.target.value})}
              >
                <option value="">Todos</option>
                {combustiveis.map(combustivel => (
                  <option key={combustivel} value={combustivel}>{combustivel}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Câmbio</label>
              <select 
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
                value={filters.cambio}
                onChange={(e) => setFilters({...filters, cambio: e.target.value})}
              >
                <option value="">Todos</option>
                {cambios.map(cambio => (
                  <option key={cambio} value={cambio}>{cambio}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
              <select 
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
                value={filters.cor}
                onChange={(e) => setFilters({...filters, cor: e.target.value})}
              >
                <option value="">Todas</option>
                {cores.map(cor => (
                  <option key={cor} value={cor}>{cor}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
