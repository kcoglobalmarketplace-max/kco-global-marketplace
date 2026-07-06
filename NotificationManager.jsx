import React, { useEffect } from 'react';

export default function NotificationManager({ message, type, onClose }) {
    useEffect(() => {
        // Automatically slide away and close after 4 seconds
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!message) return null;

    // Set colors based on operation success or alert status
    const bgClass = type === 'success' ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-orange-950 border-orange-500 text-orange-200';

    return (
        <div className="fixed bottom-6 left-6 z-50 animate-bounce-short">
            <div className={`border-l-4 p-4 rounded-r-xl shadow-2xl backdrop-blur-md max-w-sm flex items-start space-x-3 transition-all duration-300 ${bgClass}`}>
                <div className="flex-1">
                    <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">System Broadcast</p>
                    <p className="text-xs font-mono mt-1 font-semibold">{message}</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white font-bold text-sm">
                    &times;
                </button>
            </div>
        </div>
    );
}