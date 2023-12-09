import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import SignUp from './components/signup/signUp';
import Main from './components/main/main';
import Login from './components/login/login';
import Feed from './components/feed/feed';

function App() {
  return (
    <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/signup"  element={<SignUp/>} />
              <Route path="/main" element={<Main/>} />
              <Route path="/login" element={<Login/>} />
              <Route path='/feed' element={<Feed/>} />
          </Routes>   
    </BrowserRouter>
  );
}

export default App;
