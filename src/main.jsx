import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './Components/User/LoginForm.jsx';
import RegisterForm from './Components/User/RegisterForm.jsx';
import UserContextProvider from './Contexts/UserContextProvider.jsx';
import Chat from './Screens/Chat.jsx';
import ChatScreen from './Screens/ChatScreen';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/chat/:id" element={<ChatScreen />} />
        <Route path="/login" element={<UserContextProvider><LoginForm /></UserContextProvider>} />
        <Route path="/register" element={<UserContextProvider><RegisterForm /></UserContextProvider>} />
      </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)
