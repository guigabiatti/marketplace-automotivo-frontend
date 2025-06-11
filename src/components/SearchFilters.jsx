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

  const marcas = ['Chevrolet', 'Volkswagen', 'Fiat', 'Ford', 'Toyota', 'Honda', 'Hyundai', 'Jeep', 'Nissan', 'Renault'];
  const combustiveis = ['Flex', 'Gasolina', 'Etanol', 'Diesel', 'Híbrido', 'Elétrico'];
  const cambios = ['Manual', 'Automático', 'CVT', 'Automatizado'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <MagnifyingGlassIcon className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">Encontre seu carro ideal</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select 
          className="border border-gray-300 rounded-lg p-3"
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
          className="border border-gray-300 rounded-lg p-3"
          value={filters.modelo}
          onChange={(e) => setFilters({...filters, modelo: e.target.value})}
        />
        
        <button className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition-colors">
          Buscar Veículos
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
