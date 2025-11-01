import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import NotFound from './pages/NotFound/NotFound'; 

const App = () => {
  return (
    <>
      <Header /> 
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </div>
    </>
  );
};

export default App;