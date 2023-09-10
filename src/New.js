import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, InputGroup, Container } from 'react-bootstrap';

export const New = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      // Fetch messages from OpenAI when the component mounts
      fetchInitialMessage();
    }, []);
  
    const fetchInitialMessage = async () => {
      // Replace 'YOUR_API_KEY' with your actual OpenAI API key
      const apiKey = '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';
  
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci/completions',
          {
            prompt: 'Start calculator chat',
            max_tokens: 50,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
  
        const initialMessage = response.data.choices[0].text;
        setMessages([...messages, { text: initialMessage, type: 'ai' }]);
      } catch (error) {
        console.error('Error fetching initial message:', error);
      }
    };
  
    const handleInputChange = (e) => {
     setInput(e.target.value);
    };
  
    const handleSubmit = async (e) => {
       e.preventDefault();
  
      if (!input) return;
  
      setMessages([...messages, { text: input, type: 'user' }]);
      setInput('');
      setLoading(true);
  
    
      const apiKey = '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';
  
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci/completions',
          {
            prompt: `User: ${input}`,
            max_tokens: 50,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
  
        const aiResponse = response.data.choices[0].text;
        setMessages([...messages, { text: aiResponse, type: 'ai' }]);
      } catch (error) {
        console.error('Error fetching AI response:', error);
      }
  
      setLoading(false);
    };
  
    return (
      <div>
        <div>
          <div >
            <div className="chat-box">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.type === 'ai' ? 'ai' : 'user'}`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <Form onSubmit={()=>{
             handleSubmit()
            }}>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={handleInputChange}
                />
                <button type='submit' >
                 submit
                </button>
              
              </InputGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  };

