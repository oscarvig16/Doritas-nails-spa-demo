import React from 'react';
import { Link } from 'react-router-dom';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-20">
      <div className="container">
        <h2 className="section-title">We are excited to pamper you with our services!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Manicure Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl">
            <div className="p-8">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-blush rounded-full">
                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 15.5C7.88071 15.5 9 14.3807 9 13C9 11.6193 7.88071 10.5 6.5 10.5C5.11929 10.5 4 11.6193 4 13C4 14.3807 5.11929 15.5 6.5 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 4.5C19.1046 4.5 20 5.39543 20 6.5C20 7.60457 19.1046 8.5 18 8.5C16.8954 8.5 16 7.60457 16 6.5C16 5.39543 16.8954 4.5 18 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 8.5V20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 13.5L21 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 20V14C13 10.134 10.866 8 7 8L6.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4">Manicure</h3>
              <p className="text-center text-gray-600 mb-6">
                Classic, gel, and artistic designs tailored to your style.
              </p>
              <div className="text-center space-y-3">
                <Link to="/manicure" className="btn btn-secondary w-full">View Services</Link>
                <Link to="/book" className="btn btn-primary w-full">Book Now</Link>
              </div>
            </div>
          </div>
          
          {/* Pedicure Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl">
            <div className="p-8">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-blush rounded-full">
                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 16L10.5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16L14 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 16L17 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 13.5C3 14.8807 4.11929 16 5.5 16H18.5C19.8807 16 21 14.8807 21 13.5C21 12.1193 19.8807 11 18.5 11H15L12 3L9 11H5.5C4.11929 11 3 12.1193 3 13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4">Pedicure</h3>
              <p className="text-center text-gray-600 mb-6">
                Relaxing treatments that leave you refreshed from heel to toe.
              </p>
              <div className="text-center space-y-3">
                <Link to="/pedicure" className="btn btn-secondary w-full">View Services</Link>
                <Link to="/book" className="btn btn-primary w-full">Book Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};