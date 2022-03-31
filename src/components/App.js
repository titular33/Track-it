import {BrowserRouter,Routes, Route}from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './components/Home/';
import Register from './components/Register/';
import Today from './components/Today/';
import Habits from './components/Habits/';
import Historic from './components/Historic/';
import '../css/reset.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/hoje" element={<Today/>} />
        <Route path="/habitos" element={<Habits/>} />
        <Route path="/historico" element={<Historic/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
