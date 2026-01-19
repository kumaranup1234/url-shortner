import React from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationBell = () => {
    return (
        <button className="relative p-2 text-white hover:text-yellow-200 transition-colors">
            <FaBell className="w-6 h-6" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                0
            </span>
        </button>
    );
};

export default NotificationBell;
