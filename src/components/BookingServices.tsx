import React, { useState } from 'react';
import { BookingManicureServices } from './BookingManicureServices';
import { BookingPedicureServices } from './BookingPedicureServices';
import { BookingCalendar } from './BookingCalendar';
import { ShoppingBag, Calendar, Clock, Trash2, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface SelectedService {
  id: string;
  name: string;
  duration: string;
  price: number;
  options?: {
    type: string;
    value: string;
  }[];
}

export const BookingServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manicure' | 'pedicure'>('manicure');
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'services' | 'datetime'>('services');

  const handleAddService = (service: SelectedService) => {
    setSelectedServices(prev => [...prev, { ...service, id: Math.random().toString() }]);
  };

  const handleRemoveService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(service => service.id !== serviceId));
  };

  const handleDateTimeSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const totalPrice = selectedServices.reduce((total, service) => total + service.price, 0);
  const totalDuration = selectedServices.reduce((total, service) => {
    const duration = service.duration.match(/\d+/g);
    return total + (duration ? parseInt(duration[0]) : 0);
  }, 0);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${mins > 0 ? `${mins}min` : ''}`;
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blush/30 via-white to-secondary/20">
      <div className="container py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="relative text-center mb-16">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-secondary/20 rounded-full blur-2xl"></div>
            </div>
            <h1 className="relative text-4xl md:text-5xl font-playfair font-semibold text-gray-900 mb-4">
              Book Your Services
            </h1>
            <p className="relative text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our wide range of professional nail care services
            </p>
          </div>

          {step === 'services' ? (
            <>
              {/* Service Type Tabs */}
              <div className="flex justify-center mb-12">
                <div className="inline-flex rounded-full bg-white shadow-lg p-1">
                  <button
                    onClick={() => setActiveTab('manicure')}
                    className={`px-6 py-3 rounded-full transition-all ${
                      activeTab === 'manicure'
                        ? 'bg-primary text-white shadow-sm'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    Manicure Services
                  </button>
                  <button
                    onClick={() => setActiveTab('pedicure')}
                    className={`px-6 py-3 rounded-full transition-all ${
                      activeTab === 'pedicure'
                        ? 'bg-primary text-white shadow-sm'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    Pedicure Services
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Service Selection */}
                <div className="lg:col-span-2">
                  <div className="transition-all duration-300">
                    {activeTab === 'manicure' ? (
                      <BookingManicureServices onServiceSelect={handleAddService} />
                    ) : (
                      <BookingPedicureServices onServiceSelect={handleAddService} />
                    )}
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
                    <div className="flex items-center gap-3 mb-6">
                      <ShoppingBag className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl font-playfair font-semibold">Your Selection</h2>
                    </div>
                    
                    <div className="space-y-4">
                      {selectedServices.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <p>No services selected yet</p>
                          <p className="text-sm mt-2">Choose your desired services from the menu</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {selectedServices.map((service) => (
                            <div key={service.id} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h3 className="font-medium">{service.name}</h3>
                                  <div className="text-sm text-gray-600 mt-1">
                                    {service.options?.map((opt, idx) => (
                                      <div key={idx}>
                                        {opt.type}: {opt.value}
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{service.duration}</span>
                                  </div>
                                </div>
                                <div className="flex items-start gap-4">
                                  <span className="font-semibold text-primary">${service.price}</span>
                                  <button
                                    onClick={() => handleRemoveService(service.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          <div className="border-t border-gray-200 pt-4 space-y-3">
                            <div className="flex justify-between items-center text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Total Duration:</span>
                              </div>
                              <span>{formatDuration(totalDuration)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Total Price:</span>
                              <span className="text-xl font-semibold text-primary">
                                ${totalPrice}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-8">
                      <button 
                        className={`w-full btn ${
                          selectedServices.length > 0 
                            ? 'btn-primary' 
                            : 'btn-secondary opacity-50 cursor-not-allowed'
                        }`}
                        disabled={selectedServices.length === 0}
                        onClick={() => setStep('datetime')}
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Choose Date & Time
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="max-w-3xl mx-auto">
              <button
                onClick={() => setStep('services')}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Services
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BookingCalendar
                  onDateTimeSelect={handleDateTimeSelect}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                />

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-playfair font-semibold">Booking Summary</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Selected Services:</h4>
                      <ul className="space-y-2">
                        {selectedServices.map(service => (
                          <li key={service.id} className="text-sm text-gray-600">
                            • {service.name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedDate && selectedTime && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Appointment Time:</h4>
                        <div className="text-sm text-gray-600">
                          <p>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                          <p>{selectedTime}</p>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Duration:</span>
                        <span>{formatDuration(totalDuration)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total:</span>
                        <span className="text-xl font-semibold text-primary">${totalPrice}</span>
                      </div>
                    </div>

                    <button 
                      className={`w-full btn ${
                        selectedDate && selectedTime
                          ? 'btn-primary'
                          : 'btn-secondary opacity-50 cursor-not-allowed'
                      }`}
                      disabled={!selectedDate || !selectedTime}
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};