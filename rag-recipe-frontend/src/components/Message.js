// src/components/Message.js
import React from 'react';

function Message({ message }) {
    const isUserMessage = message.sender === 'user';

    return (
        <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
                className={`max-w-3/4 p-3 rounded-2xl ${
                    isUserMessage ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
                }`}
            >
                {message.text}
            </div>
        </div>
    );
}

export default Message;