import {BrowserRouter,Routes, Route}from 'react-router-dom';
import React, {useState} from 'react';
import './App.css';
import UserContext from '../contexts/UserContexts';
import Home from './components/Home/';
import Register from './components/Register/';
import Today from './components/Today/';
import Habits from './components/Habits/';
import Historic from './components/Historic/';
import ProgressContext from '../contexts/ProgressContexts.js';
import '../css/reset.css';
import '../css/style.css';

export default function App() {
  const [user, setUser] = useState("");
  const [progress, setProgress] = useState(0)
    console.log(user);
  return (
    <UserContext.Provider value={{user, setUser}}>
      <ProgressContext.Provider value = {{progress, setProgress}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/hoje" element={<Today/>} />
        <Route path="/habitos" element={<Habits/>} />
        <Route path="/historico" element={<Historic/>} />
      </Routes>
    </BrowserRouter>
    </ProgressContext.Provider>
    </UserContext.Provider>
  );
}

