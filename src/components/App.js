import {BrowserRouter,Routes, Route}from 'react-router-dom';
import React from 'react';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/progress" element={<Progress/>} />
        <Route path="/progress/:id" element={<Progress/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
