import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import SignUp from './components/signup/signUp';
import Main from './components/main/main';
import Login from './components/login/login';
import Feed from './components/feed/feed';
import Experience from './components/experience/experience';
import { Console } from 'console';

const App = () =>  {
 

  return (
    <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/signup"  element={<SignUp />} />
              <Route path="/main" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/experience" element={<Experience/>} />
              <Route path='/feed' element={<Feed myPost={false}/>} />
              <Route path='/myposts' element={<Feed myPost={true}/>} />
          </Routes>   
    </BrowserRouter>
  );
}

export default App;
