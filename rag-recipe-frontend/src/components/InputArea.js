// src/components/InputArea.js
import React from 'react';

function InputArea({ input, setInput, handleSend }) {
    return (
        <div className="p-4 flex items-center border-t border-gray-200">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-blue-200"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSend();
                    }
                }}
            />
            <button
                onClick={handleSend}
                className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
                Send
            </button>
        </div>
    );
}

export default InputArea;