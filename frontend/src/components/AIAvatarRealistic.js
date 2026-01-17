import React, { useState, useEffect, useRef } from 'react';
import './AIAvatarRealistic.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

function AIAvatarRealistic() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [avatarState, setAvatarState] = useState('idle');
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const currentStreamRef = useRef('');

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
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        setAvatarState('speaking');
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setAvatarState('idle');
      };
      
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
    setAvatarState('thinking');
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
                speak(currentStreamRef.current);
              }
            } catch (e) {}
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, there was an error processing your request.' },
      ]);
      setAvatarState('idle');
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="realistic-avatar-container" data-testid="realistic-avatar">
      <div className={`realistic-avatar ${avatarState} ${isListening ? 'listening' : ''}`}>
        <div className="avatar-hologram">
          <div className="holo-frame"></div>
          
          <div className="avatar-face">
            <div className="face-outline">
              <div className="eyes">
                <div className="eye left">
                  <div className="pupil"></div>
                </div>
                <div className="eye right">
                  <div className="pupil"></div>
                </div>
              </div>
              
              <div className="mouth">
                <div className="mouth-line"></div>
              </div>
              
              <div className="tech-details">
                <div className="scan-line"></div>
                <div className="circuit-pattern"></div>
              </div>
            </div>
          </div>
          
          <div className="status-indicator">
            {avatarState === 'idle' && 'READY'}
            {avatarState === 'thinking' && 'THINKING...'}
            {avatarState === 'speaking' && 'SPEAKING'}
            {isListening && 'LISTENING'}
          </div>
        </div>
        
        {isSpeaking && (
          <div className="voice-waves">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        )}
      </div>

      <div className="realistic-chat-container glass-card">
        <div className="chat-header">
          <div className="header-title">
            <h3>AI ASSISTANT</h3>
            <span className="status-badge">ONLINE</span>
          </div>
          <button
            className={`mic-button ${isListening ? 'active' : ''}`}
            onClick={toggleListening}
            data-testid="mic-button"
            disabled={isStreaming}
          >
            {isListening ? 'STOP' : 'VOICE'}
          </button>
        </div>

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="welcome-message">
              <p className="welcome-title">GREETINGS, HUMAN</p>
              <p>I am your AI assistant, powered by advanced neural networks.</p>
              <div className="command-examples">
                <p>Try voice commands:</p>
                <div className="command-chip">Go to battle arena</div>
                <div className="command-chip">What can you do</div>
              </div>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'user' ? 'USER' : 'AI'}
              </div>
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
            placeholder="Type your message or use voice..."
            disabled={isStreaming}
            data-testid="chat-input"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isStreaming || !inputText.trim()}
            data-testid="send-button"
            className="send-button"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAvatarRealistic;
