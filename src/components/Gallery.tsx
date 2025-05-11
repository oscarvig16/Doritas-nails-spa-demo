import React, { useState } from 'react';

interface GalleryImage {
  id: number;
  url: string;
  alt: string;
}

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = [
    { 
      id: 1, 
      url: "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg", 
      alt: "Pink manicure with flower design" 
    },
    { 
      id: 2, 
      url: "https://images.pexels.com/photos/3997383/pexels-photo-3997383.jpeg", 
      alt: "French manicure with gold accents" 
    },
    { 
      id: 3, 
      url: "https://images.pexels.com/photos/939835/pexels-photo-939835.jpeg", 
      alt: "Elegant red nail design" 
    },
    { 
      id: 4, 
      url: "https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg", 
      alt: "Blue and white nail art" 
    },
    { 
      id: 5, 
      url: "https://images.pexels.com/photos/3997375/pexels-photo-3997375.jpeg", 
      alt: "Minimalist nude nail design" 
    },
    { 
      id: 6, 
      url: "https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg", 
      alt: "Glitter accent nail art" 
    },
  ];

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="py-20 bg-blush/30">
      <div className="container">
        <h2 className="section-title">Don't miss out from having your nails looking like this!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={image.id}
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform hover:scale-[1.02] group"
              onClick={() => openLightbox(image)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img 
                src={image.url} 
                alt={image.alt}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v5m4-5v5" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="btn btn-secondary">View Full Gallery</a>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.url} 
              alt={selectedImage.alt}
              className="w-full h-auto"
            />
            <button 
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
              onClick={closeLightbox}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};