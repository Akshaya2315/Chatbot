import React, { useState } from "react";
import axios from "axios";
import "../src/chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      // Send the user's message to the backend
      const response = await axios.post('http://localhost:5000/api/chat', { message: userMessage });
      
      


      // Add bot's response to the chat
      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = { sender: "bot", text: "Error: Unable to connect to the server." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInput(""); // Clear input field
  };

  return (
    <div className="chatbot-container">
      <h1>Akshaya Chatbot</h1>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
