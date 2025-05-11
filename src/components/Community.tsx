import React from 'react';
import { Instagram } from 'lucide-react';

export const Community: React.FC = () => {
  return (
    <section id="community" className="py-20 bg-gradient-to-r from-secondary/30 to-blush/30">
      <div className="container text-center">
        <h2 className="section-title mb-10">Join the community and stay tuned!</h2>
        
        <a 
          href="https://www.instagram.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full hover:scale-110 transition-transform mb-6"
        >
          <Instagram className="w-8 h-8 text-white" />
        </a>
        
        <p className="text-lg max-w-2xl mx-auto text-gray-700">
          Follow us for exclusive designs, promotions, and nail care tips!
        </p>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div 
              key={index}
              className="aspect-square overflow-hidden rounded-lg"
            >
              <img 
                src={`https://images.pexels.com/photos/${3997370 + index}/pexels-photo-${3997370 + index}.jpeg`}
                alt="Instagram feed" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};