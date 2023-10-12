import { useEffect, useState } from "react";
import io from "socket.io-client";
import './App.css';


const socket = io("window.location.host");

const App = () => {
  
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

const handleSubmit = (event) => {
  event.preventDefault();
  const newMessage = {
    body: message,
    from: "Me",
  };
  setMessages([...messages, newMessage]);
  socket.emit("message", newMessage.body);
  setMessage('');
};

useEffect(() => {
  socket.on("message", receiveMessage);

  return () => {
    socket.off("message", receiveMessage);
  };
}, []);

  const receiveMessage = (message) =>
  setMessages((state) => [...state, message ]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div class="three">
          <h1>Best Friend</h1>
        </div>
        <input
          name="message"
          type="text"
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
        <ul className="chat">
          {messages.map((message, index) => (
            message.from === 'Me' ?
            <li
            key={index}
            className="chat-me"
          >
            <b>{message.from} :</b> {message.body}
          </li>:
            <li
            key={index}
            className="chat-them"
          >
            <b>{message.from} :</b> {message.body}
          </li>
            
          ))}
        </ul>
      </form>
    </div>
  );
};

export default App;
