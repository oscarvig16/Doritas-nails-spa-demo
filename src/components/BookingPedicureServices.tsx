import React, { useState } from 'react';
import { Clock } from 'lucide-react';

interface PedicureService {
  name: string;
  price: number;
  duration: string;
  description: string;
  gelUpgrade?: {
    price: number;
    duration: string;
  };
}

interface ServiceOptionProps {
  service: PedicureService;
  isGelSelected: boolean;
  onToggle: () => void;
}

const ServiceOption: React.FC<ServiceOptionProps> = ({ service, isGelSelected, onToggle }) => {
  const currentPrice = isGelSelected ? service.gelUpgrade!.price : service.price;
  const currentDuration = isGelSelected ? service.gelUpgrade!.duration : service.duration;

  return (
    <div className="space-y-4">
      {service.gelUpgrade && (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onToggle()}
            className={`w-full px-4 py-3 rounded-lg border transition-all ${
              !isGelSelected
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-gray-200 hover:border-primary/60 hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full border ${
                  !isGelSelected
                    ? 'border-primary bg-primary'
                    : 'border-gray-400'
                }`}>
                  {!isGelSelected && (
                    <div className="w-full h-full rounded-full bg-white transform scale-[0.4]" />
                  )}
                </div>
                <span className="font-medium">Regular Polish</span>
              </div>
              <div className="text-right">
                <span className="block text-sm font-medium">${service.price}</span>
                <span className="block text-xs text-gray-500">{service.duration}</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => onToggle()}
            className={`w-full px-4 py-3 rounded-lg border transition-all ${
              isGelSelected
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-gray-200 hover:border-primary/60 hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full border ${
                  isGelSelected
                    ? 'border-primary bg-primary'
                    : 'border-gray-400'
                }`}>
                  {isGelSelected && (
                    <div className="w-full h-full rounded-full bg-white transform scale-[0.4]" />
                  )}
                </div>
                <span className="font-medium">Gel Polish Upgrade</span>
              </div>
              <div className="text-right">
                <span className="block text-sm font-medium">${service.gelUpgrade.price}</span>
                <span className="block text-xs text-gray-500">{service.gelUpgrade.duration}</span>
              </div>
            </div>
          </button>
        </div>
      )}

      <div className="px-4 py-2 bg-secondary/10 rounded-lg text-sm">
        <div className="flex justify-between items-center text-primary">
          <span>Selected: {isGelSelected ? 'Gel Polish' : 'Regular Polish'}</span>
          <span className="font-medium">${currentPrice}</span>
        </div>
        <div className="text-gray-600 text-xs mt-1">
          Duration: {currentDuration}
        </div>
      </div>
    </div>
  );
};

export const BookingPedicureServices: React.FC<{
  onServiceSelect: (service: any) => void;
}> = ({ onServiceSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});

  const handleOptionToggle = (serviceName: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [serviceName]: !prev[serviceName]
    }));

    const service = services.find(s => s.name === serviceName);
    if (service) {
      const isGelSelected = !selectedOptions[serviceName];
      onServiceSelect({
        ...service,
        price: isGelSelected && service.gelUpgrade ? service.gelUpgrade.price : service.price,
        duration: isGelSelected && service.gelUpgrade ? service.gelUpgrade.duration : service.duration,
        options: service.gelUpgrade ? {
          type: 'Polish Type',
          value: isGelSelected ? 'Gel Polish' : 'Regular Polish'
        } : undefined
      });
    }
  };

  const services: PedicureService[] = [
    {
      name: "Basic Pedicure",
      price: 30,
      duration: "45 minutes",
      description: "Foot soak, cuticle cleaning, nail shaping, polishing, and foot massage with hot towel.",
      gelUpgrade: {
        price: 40,
        duration: "1 hour"
      }
    },
    {
      name: "Special Dorita's Pedicure",
      price: 35,
      duration: "45 minutes",
      description: "Foot soak, cuticle cleaning, nail shaping, polishing. Callus treatment and foot massage with hot towel.",
      gelUpgrade: {
        price: 45,
        duration: "1 hour 10 minutes"
      }
    },
    {
      name: "Paraffin Pedicure",
      price: 40,
      duration: "50 minutes",
      description: "Foot soak, cuticle cleaning, nail shaping, polishing. Callus treatment, paraffin wax, and foot massage with hot towel.",
      gelUpgrade: {
        price: 50,
        duration: "1 hour"
      }
    },
    {
      name: "Pedicure Spa Deluxe",
      price: 55,
      duration: "1 hour 15 minutes",
      description: "Foot soak, cuticle cleaning, nail shaping, polishing. Callus treatment, sugar scrub, foot mask, paraffin wax. Foot massage with hot towel and gel polish included."
    },
    {
      name: "Acrylic (10 Toes)",
      price: 30,
      duration: "35 minutes",
      description: "Full acrylic application on all toes. Includes nail and cuticle treatment."
    },
    {
      name: "2 Thumbs Acrylic",
      price: 10,
      duration: "20 minutes",
      description: "Acrylic application on both thumbs. Includes foot soak, cuticle cleaning, nail shaping, polishing, and foot massage with hot towel."
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-2xl font-playfair font-semibold text-gray-900">
                  {service.name}
                </h3>
                <span className="text-2xl font-playfair font-semibold text-primary">
                  ${selectedOptions[service.name] && service.gelUpgrade 
                    ? service.gelUpgrade.price 
                    : service.price}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedOptions[service.name] && service.gelUpgrade 
                    ? service.gelUpgrade.duration 
                    : service.duration}
                </div>
              </div>
              
              <div className="text-gray-700 border-t border-gray-100 pt-4">
                <p>{service.description}</p>
                
                {service.gelUpgrade ? (
                  <ServiceOption
                    service={service}
                    isGelSelected={selectedOptions[service.name] || false}
                    onToggle={() => handleOptionToggle(service.name)}
                  />
                ) : (
                  <button
                    onClick={() => onServiceSelect(service)}
                    className="mt-4 w-full btn btn-primary"
                  >
                    Select Service
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};