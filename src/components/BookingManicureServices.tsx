import React, { useState } from 'react';
import { Clock, Plus, Minus, Check } from 'lucide-react';

interface Service {
  title: string;
  category: string;
  subcategory: string;
  duration: string;
  price: string | number;
  description: string;
  options?: {
    twoNail?: {
      price: string | number;
      duration: string;
    };
    tenNail?: {
      price: string | number;
      duration: string;
    };
  };
  addOns?: string[];
  isRepairService?: boolean;
  isDesignService?: boolean;
}

interface ServiceOptionSelectorProps {
  service: Service;
  selectedOption: 'twoNail' | 'tenNail' | null;
  onSelect: (option: 'twoNail' | 'tenNail' | null) => void;
}

interface RepairQuantitySelectorProps {
  basePrice: number;
  onQuantityChange: (quantity: number) => void;
}

interface DesignSelectorProps {
  designs: string[];
  onDesignsChange: (selectedDesigns: string[]) => void;
  maxPrice: number;
  minPrice: number;
}

const DesignSelector: React.FC<DesignSelectorProps> = ({ 
  designs, 
  onDesignsChange, 
  maxPrice, 
  minPrice 
}) => {
  const [selectedDesigns, setSelectedDesigns] = useState<string[]>([]);

  const handleDesignToggle = (design: string) => {
    const newSelection = selectedDesigns.includes(design)
      ? selectedDesigns.filter(d => d !== design)
      : [...selectedDesigns, design];
    
    setSelectedDesigns(newSelection);
    onDesignsChange(newSelection);
  };

  const currentPrice = selectedDesigns.length >= 3 ? maxPrice : minPrice;

  return (
    <div className="mt-4 space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="font-medium mb-3">Select Your Designs:</h4>
        <div className="space-y-2">
          {designs.map((design, index) => (
            <button
              key={index}
              onClick={() => handleDesignToggle(design)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                selectedDesigns.includes(design)
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span>{design}</span>
              {selectedDesigns.includes(design) && (
                <Check className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-secondary/10 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              Selected: {selectedDesigns.length} design{selectedDesigns.length !== 1 ? 's' : ''}
            </p>
            <p className="text-sm text-gray-600">
              {selectedDesigns.length >= 3 ? '3+ designs selected' : 'Less than 3 designs'}
            </p>
          </div>
          <span className="text-lg font-semibold text-primary">
            ${currentPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

const RepairQuantitySelector: React.FC<RepairQuantitySelectorProps> = ({ basePrice, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);
  const maxNails = 10;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxNails) {
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4">
        <span className="font-medium">Number of nails:</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              quantity <= 1 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= maxNails}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              quantity >= maxNails 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="bg-secondary/10 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Total price:</span>
          <span className="text-lg font-semibold text-primary">${basePrice * quantity}</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Estimated time: {quantity * 10} minutes
        </div>
      </div>
    </div>
  );
};

const ServiceOptionSelector: React.FC<ServiceOptionSelectorProps> = ({ service, selectedOption, onSelect }) => {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onSelect(selectedOption === 'twoNail' ? null : 'twoNail')}
          className={`w-full px-4 py-3 rounded-lg border transition-all ${
            selectedOption === 'twoNail'
              ? 'border-primary bg-primary/5 shadow-sm'
              : 'border-gray-200 hover:border-primary/60 hover:bg-gray-50'
          }`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border ${
                selectedOption === 'twoNail'
                  ? 'border-primary bg-primary'
                  : 'border-gray-400'
              }`}>
                {selectedOption === 'twoNail' && (
                  <div className="w-full h-full rounded-full bg-white transform scale-[0.4]" />
                )}
              </div>
              <span className="font-medium">2 Nails</span>
            </div>
            <div className="text-right">
              <span className="block text-sm font-medium">
                ${service.options?.twoNail?.price}
              </span>
              <span className="block text-xs text-gray-500">
                {service.options?.twoNail?.duration}
              </span>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect(selectedOption === 'tenNail' ? null : 'tenNail')}
          className={`w-full px-4 py-3 rounded-lg border transition-all ${
            selectedOption === 'tenNail'
              ? 'border-primary bg-primary/5 shadow-sm'
              : 'border-gray-200 hover:border-primary/60 hover:bg-gray-50'
          }`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border ${
                selectedOption === 'tenNail'
                  ? 'border-primary bg-primary'
                  : 'border-gray-400'
              }`}>
                {selectedOption === 'tenNail' && (
                  <div className="w-full h-full rounded-full bg-white transform scale-[0.4]" />
                )}
              </div>
              <span className="font-medium">10 Nails</span>
            </div>
            <div className="text-right">
              <span className="block text-sm font-medium">
                ${service.options?.tenNail?.price}
              </span>
              <span className="block text-xs text-gray-500">
                {service.options?.tenNail?.duration}
              </span>
            </div>
          </div>
        </button>
      </div>

      {selectedOption && (
        <div className="px-4 py-2 bg-secondary/10 rounded-lg text-sm text-primary">
          Selected: {selectedOption === 'twoNail' ? '2 Nails' : '10 Nails'} - 
          ${selectedOption === 'twoNail' 
            ? service.options?.twoNail?.price 
            : service.options?.tenNail?.price
          }
        </div>
      )}
    </div>
  );
};

export const BookingManicureServices: React.FC<{
  onServiceSelect: (service: any) => void;
}> = ({ onServiceSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, 'twoNail' | 'tenNail' | null>>({});
  const [repairQuantity, setRepairQuantity] = useState(1);
  const [selectedDesigns, setSelectedDesigns] = useState<Record<string, string[]>>({});

  const handleOptionSelect = (serviceTitle: string, option: 'twoNail' | 'tenNail' | null) => {
    setSelectedOptions(prev => ({
      ...prev,
      [serviceTitle]: option
    }));

    if (option) {
      const service = services.find(s => s.title === serviceTitle);
      if (service && service.options) {
        const selectedOption = service.options[option];
        onServiceSelect({
          ...service,
          price: selectedOption.price,
          duration: selectedOption.duration,
          options: {
            type: option === 'twoNail' ? '2 Nails' : '10 Nails',
            value: `${selectedOption.price}`
          }
        });
      }
    }
  };

  const handleRepairQuantityChange = (quantity: number) => {
    setRepairQuantity(quantity);
    const service = services.find(s => s.isRepairService);
    if (service) {
      onServiceSelect({
        ...service,
        price: service.price * quantity,
        options: {
          type: 'Quantity',
          value: `${quantity} nails`
        }
      });
    }
  };

  const handleDesignsChange = (serviceTitle: string, designs: string[]) => {
    setSelectedDesigns(prev => ({
      ...prev,
      [serviceTitle]: designs
    }));

    const service = services.find(s => s.title === serviceTitle);
    if (service && service.isDesignService) {
      const price = designs.length >= 3 
        ? (serviceTitle === "2 Nails Design" ? 8 : 20)
        : (serviceTitle === "2 Nails Design" ? 5 : 15);
      
      onServiceSelect({
        ...service,
        price,
        options: {
          type: 'Designs',
          value: designs.join(', ')
        }
      });
    }
  };

  const services: Service[] = [
    {
      title: "Short Square (S)",
      category: "Manicure",
      subcategory: "Square Size (TL)",
      duration: "1h 30min",
      price: 50,
      description: "Includes gel top coat, nail & cuticle treatment."
    }
  ];

  const categories = Array.from(new Set(services.map(service => service.subcategory)));

  return (
    <div className="space-y-8">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-6">
            {category}
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {services
              .filter(service => service.subcategory === category)
              .map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-playfair font-semibold text-gray-900">
                        {service.title}
                      </h3>
                      <span className="text-xl font-playfair font-semibold text-primary">
                        ${service.price}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration}
                      </div>
                    </div>
                    
                    <div className="text-gray-700 border-t border-gray-100 pt-4">
                      <p>{service.description}</p>
                      
                      {service.isRepairService && (
                        <RepairQuantitySelector
                          basePrice={Number(service.price)}
                          onQuantityChange={handleRepairQuantityChange}
                        />
                      )}
                      
                      {service.isDesignService && service.addOns && (
                        <DesignSelector
                          designs={service.addOns}
                          onDesignsChange={(designs) => handleDesignsChange(service.title, designs)}
                          maxPrice={service.title === "2 Nails Design" ? 8 : 20}
                          minPrice={service.title === "2 Nails Design" ? 5 : 15}
                        />
                      )}
                      
                      {service.options && !service.isDesignService && (
                        <ServiceOptionSelector
                          service={service}
                          selectedOption={selectedOptions[service.title] || null}
                          onSelect={(option) => handleOptionSelect(service.title, option)}
                        />
                      )}

                      {!service.options && !service.isRepairService && !service.isDesignService && (
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
      ))}
    </div>
  );
};