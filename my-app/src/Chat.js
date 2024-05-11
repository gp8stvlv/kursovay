import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';
import ChatMessage from './ChatMessage';
import Header from './Header';

const Chat = () => {
    const [messages, setMessages] = useState([
        { text: "Привет! Как я могу вам помочь?", sender: 'bank' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [userName, setUserName] = useState('');
    const messagesEndRef = useRef(null); // 1. Создаем ref для последнего элемента

    const handleLogin = () => {
        const name = prompt('Введите ваше имя');
        if (name) {
            setUserName(name);
        }
    };

    const handleLogout = () => {
        setUserName('');
    };

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            setMessages([...messages, { text: inputValue, sender: 'user' }]);
            setInputValue('');
        }
    };

    useEffect(() => {
        // 2. Прокручиваем до последнего сообщения при изменении messages
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div>
            <Header bankName="Райффайзен Банк" userName={userName} onLogout={handleLogout} onLogin={handleLogin} />
            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg.text} sender={msg.sender} />
                    ))}
                    {/* 3. Ссылка на последний элемент */}
                    <div ref={messagesEndRef} />
                </div>
                {userName && (
                    <form className="chat-form" onSubmit={handleMessageSubmit}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Введите ваше сообщение..."
                        />
                        <button type="submit">Отправить</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Chat;
