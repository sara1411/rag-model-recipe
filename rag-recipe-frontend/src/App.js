import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Message from './components/Message';
import InputArea from './components/InputArea';
import LoadingIndicator from './components/LoadingIndicator';

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (input.trim()) {
            const userMessage = { text: input, sender: 'user' };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInput('');
            setIsLoading(true);

            try {
                const response = await axios.post('http://10.0.0.182:3001/query', { query: input });
                const aiMessage = { text: response.data.summary, sender: 'ai' };
                setMessages((prevMessages) => [...prevMessages, aiMessage]);
            } catch (error) {
                console.error('Error querying:', error);
                const errorMessage = { text: 'An error occurred.', sender: 'ai' };
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="fixed top-0 left-0 w-full bg-blue-500 text-white p-4 text-center shadow-md z-10">
            <h1 className="text-2xl font-semibold">FoodWise App</h1>
        </div>
            <div className="flex justify-center items-center flex-1">
                <div className="w-full h-full flex flex-col shadow-lg rounded-lg overflow-hidden">
                    <div className="flex-1 flex flex-col justify-between">
                        <div
                            ref={chatContainerRef}
                            className="flex-1 overflow-y-auto p-4 pt-16" // Added pt-16
                        >
                            {messages.map((message, index) => (
                                <Message key={index} message={message} />
                            ))}
                            {isLoading && (
                                <div className="flex justify-start mb-4">
                                    <LoadingIndicator />
                                </div>
                            )}
                        </div>
                        <InputArea
                            input={input}
                            setInput={setInput}
                            handleSend={handleSend}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default App;