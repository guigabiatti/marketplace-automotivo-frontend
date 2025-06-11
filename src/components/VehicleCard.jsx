import React from 'react';

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={vehicle.image || '/placeholder-car.jpg'} 
        alt={`${vehicle.marca} ${vehicle.modelo}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {vehicle.marca} {vehicle.modelo}
        </h3>
        <p className="text-gray-600 mb-2">{vehicle.ano} • {vehicle.combustivel}</p>
        <p className="text-2xl font-bold text-blue-600 mb-3">
          R$ {vehicle.preco?.toLocaleString('pt-BR')}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{vehicle.km?.toLocaleString('pt-BR')} km</span>
          <span>{vehicle.cambio}</span>
        </div>
        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Ver Detalhes
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
