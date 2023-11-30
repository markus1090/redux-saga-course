import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Public from './public/Public';
import Private from './private/Private';
import ErrorPage from './public/pages/ErrorPage';
//https://www.youtube.com/watch?v=NqzdVN2tyvQ   da riprendere 3 parte con redux thunk

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<Public />} />
        <Route path="/private/*" element={<Private />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
