import React from 'react';
import './App.css';
import {One} from './components/One';
import {Two} from "./components/Two"
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='one' element={<One/>}/>
      <Route path='two' element={<Two/>}/>
    </Routes>
  );
}

export default App;
