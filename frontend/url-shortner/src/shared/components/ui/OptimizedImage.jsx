import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({
    src,
    alt,
    className = '',
    fallback = '/no-image.svg',
    lazy = true,
    ...props
}) => {
    const [imageSrc, setImageSrc] = useState(lazy ? null : src);
    const [imageRef, setImageRef] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        let observer;

        if (lazy && imageRef && 'IntersectionObserver' in window) {
            observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setImageSrc(src);
                            observer.unobserve(imageRef);
                        }
                    });
                },
                { threshold: 0.1 }
            );
            observer.observe(imageRef);
        } else if (!lazy) {
            setImageSrc(src);
        }

        return () => {
            if (observer && observer.unobserve) {
                observer.unobserve(imageRef);
            }
        };
    }, [imageRef, src, lazy]);

    const handleLoad = () => {
        setLoaded(true);
    };

    const handleError = () => {
        setError(true);
        setImageSrc(fallback);
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {!loaded && !error && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                </div>
            )}

            <img
                ref={setImageRef}
                src={imageSrc || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                className={`
          transition-opacity duration-300
          ${loaded ? 'opacity-100' : 'opacity-0'}
          ${className}
        `}
                loading={lazy ? 'lazy' : 'eager'}
                {...props}
            />
        </div>
    );
};

export default OptimizedImage;