import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LazyImage = ({ src, alt, className = '', ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fallbackImage = 'https://images.unsplash.com/photo-1590846406792-0adc7f138fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Shimmer Placeholder */}
      {!isLoaded && !hasError && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        />
      )}
      
      {/* Actual Image */}
      <img
        src={hasError ? fallbackImage : src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
