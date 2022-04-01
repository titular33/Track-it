import {BrowserRouter,Routes, Route}from 'react-router-dom';
import React, {useState} from 'react';
import UserContext from '../contexts/UserContexts';
import Home from './Home';
import Register from './Register';
import Today from './Today';
import Habits from './Habits';
import Historic from './Historic';
import ProgressContext from '../contexts/ProgressContexts.js';
import '../css/reset.css';
import '../css/style.css';

export default function App() {
  const [user, setUser] = useState("");
  const [progress, setProgress] = useState(0)
  return (
    <UserContext.Provider value={{user, setUser}}>
      <ProgressContext.Provider value = {{progress, setProgress}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cadastro" element={<Register/>} />
        <Route path="/habitos" element={<Habits/>} />
        <Route path="/hoje" element={<Today/>} />
        <Route path="/historico" element={<Historic/>} />
      </Routes>
    </BrowserRouter>
    </ProgressContext.Provider>
    </UserContext.Provider>
  );
}

