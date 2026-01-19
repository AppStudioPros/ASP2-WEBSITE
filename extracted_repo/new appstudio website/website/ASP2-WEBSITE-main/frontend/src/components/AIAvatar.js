import React, { useState, useEffect, useRef } from 'react';
import './AIAvatar.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

function AIAvatar() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const currentStreamRef = useRef('');

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVoiceCommand(transcript);
        handleVoiceCommand(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    
    // Check for navigation commands
    if (lowerCommand.includes('battle') || lowerCommand.includes('arena')) {
      const battleBtn = document.querySelector('[data-testid="nav-battle"]');
      if (battleBtn) battleBtn.click();
      speak('Opening Battle Arena');
      return;
    }
    
    if (lowerCommand.includes('home') || lowerCommand.includes('avatar')) {
      const heroBtn = document.querySelector('[data-testid="nav-hero"]');
      if (heroBtn) heroBtn.click();
      speak('Going to home');
      return;
    }
    
    // Otherwise, treat as a question
    setInputText(command);
    handleSendMessage(command);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      setVoiceCommand('');
    }
  };

  const speak = (text) => {
    if (synthRef.current) {
      // Cancel any ongoing speech
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const handleSendMessage = async (textToSend) => {
    const messageText = textToSend || inputText;
    if (!messageText.trim()) return;

    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsStreaming(true);
    currentStreamRef.current = '';

    try {
      const response = await fetch(`${BACKEND_URL}/api/ai/claude/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          session_id: 'avatar-' + Date.now(),
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = { role: 'assistant', content: '' };
      
      setMessages(prev => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.token) {
                currentStreamRef.current += data.token;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].content = currentStreamRef.current;
                  return newMessages;
                });
              }
              
              if (data.done) {
                // Speak the response
                speak(currentStreamRef.current);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, there was an error processing your request.' },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="ai-avatar-container" data-testid="ai-avatar">
      {/* Avatar Orb */}
      <div className={`avatar-orb ${isSpeaking ? 'speaking' : ''} ${isListening ? 'listening' : ''}`}>
        <div className="orb-inner">
          <div className="orb-core"></div>
        </div>
        {isSpeaking && <div className="sound-wave"></div>}
      </div>

      {/* Voice Status */}
      {isListening && (
        <div className="voice-status">
          <div className="listening-indicator"></div>
          <p>Listening...</p>
          {voiceCommand && <p className="voice-command">Heard: "{voiceCommand}"</p>}
        </div>
      )}

      {/* Chat Interface */}
      <div className="chat-container glass-card">
        <div className="chat-header">
          <h3>AI Assistant</h3>
          <button
            className={`mic-button ${isListening ? 'active' : ''}`}
            onClick={toggleListening}
            data-testid="mic-button"
            disabled={isStreaming}
          >
            {isListening ? '🎤 Stop' : '🎤 Speak'}
          </button>
        </div>

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="welcome-message">
              <p>👋 Hello! I'm your AI assistant.</p>
              <p>Ask me anything or try voice commands like:</p>
              <ul>
                <li>"Go to battle arena"</li>
                <li>"Tell me about your services"</li>
                <li>"What can you do?"</li>
              </ul>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-content">
                {msg.content || '...'}
              </div>
            </div>
          ))}
          {isStreaming && (
            <div className="streaming-indicator">
              <span></span><span></span><span></span>
            </div>
          )}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            disabled={isStreaming}
            data-testid="chat-input"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isStreaming || !inputText.trim()}
            data-testid="send-button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAvatar;
