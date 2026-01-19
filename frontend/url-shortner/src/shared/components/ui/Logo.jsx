import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent hover:scale-105 transition-transform">
            UrlShortner
        </Link>
    );
};

export default Logo;
