import React from 'react';

export const Location: React.FC = () => {
  const businessHours = [
    { day: 'Monday', hours: '8:00 am – 4:00 pm' },
    { day: 'Tuesday', hours: 'Closed' },
    { day: 'Wednesday', hours: '8:00 am – 4:00 pm' },
    { day: 'Thursday', hours: '8:00 am – 4:00 pm' },
    { day: 'Friday', hours: '8:00 am – 4:00 pm' },
    { day: 'Saturday', hours: '8:00 am – 4:00 pm' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  const address = "202 N Riverside Ave Suite C, Rialto, CA 92376";
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}`;

  return (
    <section id="location" className="py-20">
      <div className="container">
        <h2 className="section-title">Visit Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Map */}
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Dorita's Nails Spa Location"
              width="100%"
              height="100%"
              frameBorder="0"
              src={googleMapsUrl}
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Business Hours */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Business Hours</h3>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <ul className="space-y-3">
                {businessHours.map((item, index) => (
                  <li 
                    key={index} 
                    className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-100"
                  >
                    <span className={`font-medium ${item.hours === 'Closed' ? 'text-red-500' : ''}`}>
                      {item.day}:
                    </span>
                    <span className={item.hours === 'Closed' ? 'text-red-500' : ''}>
                      {item.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <h4 className="text-xl font-medium mb-2">Our Address:</h4>
              <p className="text-gray-700">{address}</p>
              
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary mt-4 hover:text-primary/80 transition-colors"
              >
                Get Directions
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};