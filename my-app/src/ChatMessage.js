const ChatMessage = ({ message, sender }) => {
    const messageClass = sender === 'user' ? 'user' : 'bank incoming';

    return (
        <div className={`message ${messageClass}`}>
            {message}
        </div>
    );
};

export default ChatMessage;