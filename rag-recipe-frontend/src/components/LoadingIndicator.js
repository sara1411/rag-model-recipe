// src/components/LoadingIndicator.js
import React, { useState, useEffect } from 'react';

function LoadingIndicator() {
    const [dots, setDots] = useState('.');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots === '...') {
                    return '.';
                }
                return prevDots + '.';
            });
        }, 500); // Adjust the interval as needed

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="inline-block p-3 rounded-2xl bg-gray-100 text-left">
            Thinking{dots}
        </div>
    );
}

export default LoadingIndicator;